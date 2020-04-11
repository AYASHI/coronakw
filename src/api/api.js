import axios from 'axios';
//import {BASE_URL} from './constants/config';
import store from './store';
import { showMessage } from 'react-native-flash-message';

const host = 'https://test-shlonikapi.azurefd.net/';
export const BASE_URL = host + language + '/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const post = (url, payload) => {
    return apiClient.post(url, payload);
};

export const get = (url, payload) => {
    return apiClient.get(url, payload);
};

// Add a request interceptor
apiClient.interceptors.request.use(config => {
    // const token = store.getState().auth.token;
    // if (token !== null) {
    //     config.headers.Authorization = 'Bearer ' + token;
    // }
    return config;
});

// Add a response interceptor
apiClient.interceptors.response.use(response=> {
    return response.data

}, error =>{
    // if (error.response.status === 401) {
    //     showMessage({message: error.response.data.payload.message, type: 'danger'})
    // }
    return error

});
