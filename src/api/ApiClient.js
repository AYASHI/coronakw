import axios from 'axios';
//import {BASE_URL} from './constants/config';
import store from '../store/store';
import * as actionTypes from '../store/actionTypes'
import { showMessage } from 'react-native-flash-message';
import reactotron from 'reactotron-react-native';

const host = 'https://test-shlonikapi.azurefd.net/';
export const BASE_URL = host  + 'en/api/v1/';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

const post = (url, payload) => {
    store.dispatch({type: actionTypes.REQUEST_STARTED})
    return apiClient.post(url, payload)
    .then(response =>{ 
         store.dispatch({type: actionTypes.REQUEST_SUCCESS, value: response.message})
         return response
    })
    .catch(error=> {
        reactotron.log('res', response) 
         return error});
};

const get = (url, payload) => {
    return apiClient.get(url, payload)
    .then(response => response)
    .catch(error=> error);
};

// Add a request interceptor
apiClient.interceptors.request.use(config => {
     const token = store.getState().user.token;
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + token;
    }
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

export default {get, post}