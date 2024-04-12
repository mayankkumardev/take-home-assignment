import axios from 'axios';

import {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError,
} from './interceptors';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(handleResponse, handleResponseError);
api.interceptors.request.use(handleRequest, handleRequestError);

export default api;
