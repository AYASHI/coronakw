import * as actionTypes from './actionTypes';

const validateCivilId = civilID => dispatch => {
  return dispatch({
    type: actionTypes.CIVIL_ID_SEND,
    value: civilID,
  });
};

const showError = message => dispatch => {
  dispatch({
    type: actionTypes.SHOW_ERROR,
    message: message,
  });
};

const validateOTP = otp => dispatch =>
  dispatch({
    type: actionTypes.SEND_OTP,
    value: otp,
  });

const validatePhoneNumber = phone => dispatch =>
  dispatch({
    type: actionTypes.PHONE_NUMBER_SEND,
    value: phone,
  });

// action creators
const ActionCreators = {
  validateCivilId,
  showError,
  validateOTP,
  validatePhoneNumber,
};

export default ActionCreators;
