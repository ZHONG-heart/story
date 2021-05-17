import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const $http = axios.create({
    timeout: 1000 * 60 * 10
});
  
$http.interceptors.request.use(res => {
    res.headers.common['X-Token'] =  ''
    return res;
});



export { $http }