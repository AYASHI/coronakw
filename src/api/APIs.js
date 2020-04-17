import ApiClient from './ApiClient';
import URLS from './URLS';

// Authentication and registering users
function validateUserNationalID(payload) {
  return ApiClient.post(URLS.validateNationalID, payload);
}

function validatePhoneNumber(payload) {
  return ApiClient.post(URLS.validatePhoneNumber, payload);
}

function registerUser(payload) {
  return ApiClient.post(URLS.registerUser, payload);
}

export default {
  validateUserNationalID,
  validatePhoneNumber,
  registerUser,
};
