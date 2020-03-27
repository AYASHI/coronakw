import * as actionTypes from './actionTypes';

const validateCivilId = (CivilId, SerialNumber) => dispatch => {
  return dispatch({
    type: actionTypes.CIVIL_ID_SEND,
    payload: {
      CivilId,
      SerialNumber
    },
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

const validatePhoneNumber = phone => (dispatch, getState) =>{
  console.log('validate phone', getState());

  dispatch({
    type: actionTypes.PHONE_NUMBER_SEND,
    payload: {
      phone,
      civilID: getState().auth.civilID,
      serialNumber: getState().auth.serialNumber,
    },
  })
}
 
  ;

const registerUser = (
  otp,
) => (dispatch, getState) =>
  dispatch({
    type: actionTypes.SEND_REGISTER,
    value: {
      CivilId: getState().auth.civilID,
      MobileNumber: getState().auth.phoneNumber,
      otp: otp,
      CivilIdSerialNumber: getState().auth.serialNumber,
      UniqueDeviceId: "23232",
      FireBaseTokenId: "232343"
    },
  });

const confirmTempreture = temp => dispatch =>
  dispatch({
    type: actionTypes.SEND_TEMPERATURE,
    value: {temperature: temp},
  });

const sendLocation = (
  latitude,
  longitude,
  areaId,
  street,
  block,
  phone,
) => dispatch =>
  dispatch({
    type: actionTypes.SEND_LOCATION,
    value: {
      latitude,
      longitude,
      area_id: areaId,
      street,
      block,
      phone_number: phone,
    },
  });

const temperatureModalShown = shown => dispatch =>
  dispatch({
    type: actionTypes.TEMPERATURE_MODAL_SHOWN,
    value: shown,
  });

const resetTemperatureRequestState = (
  shownFromOnBoarding = true,
) => dispatch => {
  dispatch({
    type: actionTypes.TEMPERATURE_RESET,
    value: shownFromOnBoarding,
  });
};

const setCivilInformation = (civilID, serialNumber) => dispatch => {
  dispatch({
    type: actionTypes.SET_CIVIL_INFORMATION,
    payload: {
      civilID,
      serialNumber,
    },
  });
};

const checkIsUserRegistered = (civilID, serialNumber) => dispatch => {
  dispatch({
    type: actionTypes.SEND_CHECK_ISREGISTERED,
    payload: {
      civilID,
      serialNumber,
    },
  });
};
// action creators
const ActionCreators = {
  checkIsUserRegistered,
  setCivilInformation,
  resetTemperatureRequestState,
  temperatureModalShown,
  sendLocation,
  confirmTempreture,
  registerUser,
  validateCivilId,
  showError,
  validateOTP,
  validatePhoneNumber,
};

export default ActionCreators;
