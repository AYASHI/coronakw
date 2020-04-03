import {I18nManager} from 'react-native';

export const MOCK_BASE_URL =
  'https://3e73db34-34c9-4fae-9ea3-5d501573e04e.mock.pstmn.io';
const language = I18nManager.isRTL ? 'ar' : 'en';
const host = 'https://test-shlonikapi.azurefd.net/'; // new
// const host = 'https://test-shelonekapi.azurewebsites.net/'
export const BASE_URL = host + language + '/api/v1';

//health status
export const HEALTHY = 1;
export const UNHEALTHY = 2;
export const SERIOUSLY_UNHEALTHY = 3;
