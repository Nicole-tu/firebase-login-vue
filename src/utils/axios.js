import axios from 'axios';
import store from '../store';

import {
  url,
  apiVer
} from '@configs/constants';

axios.defaults.baseURL = url.baseUrl + apiVer.ver;
axios.defaults.timeout = 30000;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('lang') || 'en';

axios.interceptors.request.use(
  (request) => {
    store.commit('updateShowLoading', true);
    let authToken = localStorage.getItem('token');
    if (authToken === null) {
      delete request.headers.common['Authorization'];
    } else {
      request.headers.common['Authorization'] = localStorage.getItem('token');
    }
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  (err) => {
    store.commit('updateShowLoading', false);
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  (response) => {
    store.commit('updateShowLoading', false);
    store.commit('updateResponseHeader', response.headers);
    return response.data;
  },
  (err) => {
    const error = err.response;
    store.commit('updateShowLoading', false);
    return Promise.reject(error);
  },
);

export default axios;
