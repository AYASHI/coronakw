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

const registerUser = (
  civil,
  name,
  phone,
  didTravelOutside,
  countriesVisited,
) => dispatch =>
  dispatch({
    type: actionTypes.TRY_REGISTER,
    value: {civil, name, phone, didTravelOutside, countriesVisited},
  });

const confirmTempreture = temp => dispatch =>
  dispatch({
    type: actionTypes.SEND_TEMPERATURE,
    value: temp,
  });

const sendLocation = (areaId, street, block, phone) => dispatch =>
  dispatch({
    type: actionTypes.SEND_LOCATION,
    value: {areaId, street, block, phone},
  });

// action creators
const ActionCreators = {
  sendLocation,
  confirmTempreture,
  registerUser,
  validateCivilId,
  showError,
  validateOTP,
  validatePhoneNumber,
};

export default ActionCreators;
