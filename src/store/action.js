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
    type: actionTypes.SEND_REGISTER,
    value: {civil_id: civil, name, phone_number: phone, did_travel_outside: didTravelOutside, visited_countries: countriesVisited},
  });

const confirmTempreture = temp => dispatch =>
  dispatch({
    type: actionTypes.SEND_TEMPERATURE,
    value: {temperature: temp},
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
