import {I18nManager} from 'react-native';

const language = I18nManager.isRTL ? 'ar' : 'en';
const host = 'https://yourapihost.com/'; // new
export const BASE_URL = host + language + '/api/v1';

//health status
export const HEALTHY = 1;
export const UNHEALTHY = 2;
export const SERIOUSLY_UNHEALTHY = 3;
