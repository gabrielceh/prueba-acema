import axios from 'axios';
import { ENV } from '../config';
import { LOCAL_STORAGE_CONSTANTS } from '../constants/local-storage.constants';

const usersApi = axios.create({
  baseURL: ENV.apiUrl
});

usersApi.interceptors.request.use(async(config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.userToken)

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})

export { usersApi };