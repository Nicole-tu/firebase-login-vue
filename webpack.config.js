const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackManifestPlugin = require('webpack-manifest-plugin');
const cleanWebapckPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// see analyze
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const { EvalSourceMapDevToolPlugin } = require('webpack');
const resourcesPath = `${__dirname}/src`;

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const hasEnvFile = fs.existsSync('./.env');
  return {
    entry: {
      app: './src/main.js',
      polyfill: '@babel/polyfill'
    },
    devtool: devMode ? 'inline-source-map' : false,
    node: {
      fs: 'empty'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory=true',
          include: path.join(resourcesPath),
          exclude: /node_modules/,
          options: {
            plugins: ['lodash'],
            presets: ['@babel/preset-env']
          }
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
          include: path.join(resourcesPath)
        },
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.join(resourcesPath), path.join(resourcesPath, 'test')],
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? {
              loader: 'style-loader',
              options: {
                insertAt: 'top', // 样式插入到<head>
                singleton: true //将所有的style标签合并成一个
              }
            } : miniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })],
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  './src/assets/scss'
                ],
                data: '@import "main.scss";'
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash:5].[ext]',
                limit: 10000,
                outputPath: 'img/'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js',
        '@': path.resolve(`${resourcesPath}`),
        '@assets': path.resolve(`${resourcesPath}/assets`),
        '@components': path.resolve(`${resourcesPath}/components`),
        '@mixins': path.resolve(`${resourcesPath}/mixins`),
        '@plugins': path.resolve(`${resourcesPath}/plugins`),
        '@router': path.resolve(`${resourcesPath}/router`),
        '@store': path.resolve(`${resourcesPath}/store`),
        '@views': path.resolve(`${resourcesPath}/views`)
      },
      extensions: ['.js', '.vue', '.scss', '.css']
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new cleanWebapckPlugin([`${resourcesPath}/dist`], {
        root: __dirname,
        verbose: true,
        dry: false
      }),
      new copyWebpackPlugin([
        {
          context: './src/assets/img',
          from: './**/*',
          to: 'img'
        }
      ]),
      hasEnvFile &&
      new Dotenv({
        path: './.env'
      }),
      new htmlWebpackPlugin({
        favicon: './src/assets/img/supplies.svg',
        title: 'Firebase Login | Nicole Tu',
        template: './src/index.html',
        chunksSortMode: 'dependency',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false
        }
      }),
      new LodashWebpackPlugin({
        caching: true,
        collections: true,
        paths: true
      }),
      new miniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash:5].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash:5].css'
      }),
      new optimizeCssAssetsPlugin(),
      new vueLoaderPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-TW/),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.ProvidePlugin({
        '_': 'lodash'
      }),
      new webpackManifestPlugin()
    ].filter(n => n),
    performance: {
      hints: devMode ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      },
      minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false
      })]
    },
    devServer: {
      contentBase: path.join(resourcesPath, 'dist'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: false,
      overlay: true,
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 8081,
      stats: {
        normal: true
      }
    }
  };
};
