const routes = [{
  path: '/',
  name: 'Main',
  redirect: '/login',
  component: () => import('@views/Main'),
  meta: {
    requireAuth: true
  },
  children: [
  ]
},
{
  path: "/login",
  name: "Login",
  component: () => import("@views/Login")
},
{
  path: '*',
  redirect: '/login'
}
];

export default routes;
