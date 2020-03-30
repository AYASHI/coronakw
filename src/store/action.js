import * as actionTypes from './actionTypes';

const validateCivilId = (CivilId, SerialNumber) => dispatch => {
  return dispatch({
    type: actionTypes.CIVIL_ID_SEND,
    payload: {
      CivilId,
      SerialNumber,
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

const validatePhoneNumber = phone => (dispatch, getState) => {
  dispatch({
    type: actionTypes.PHONE_NUMBER_SEND,
    payload: {
      phone,
      civilID: getState().auth.civilID,
      serialNumber: getState().auth.serialNumber,
    },
  });
};

const registerUser = otp => (dispatch, getState) =>
  dispatch({
    type: actionTypes.SEND_REGISTER,
    value: {
      CivilId: getState().auth.civilID,
      MobileNumber: getState().auth.phoneNumber,
      otp: otp,
      CivilIdSerialNumber: getState().auth.serialNumber,
      UniqueDeviceId: '23232',
      FireBaseTokenId: '232343',
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
    payload: {
      Latitude: latitude,
      Longitude: longitude,
      AreaId: areaId,
      Street: street,
      Block: block,
      phone_number: phone,
      AccommodationType: 0,
      Floor: '',
      Avenue: '',
      HouseBuildingNumber: '',
      BuildingNumber: '',
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

const addPatientAssociate = person => (dispatch, getState) => {
  const mapped = {
    AssociateName: person.name,
    AssociateAddress: 'dummy',
    AssociateFirstPhoneNumber: person.phone,
    AssociateSecondPhoneNumber: 'dummy',
    IsTravelWith: false,
  };

  dispatch({
    type: actionTypes.SEND_POSSIBLE_INFECTIONS,
    payload: {...mapped},
    token: getState().user.token,
  });
};

const possibleInfectionsModalShown = shown => dispatch => {
  dispatch({
    type: actionTypes.POSSIBLE_INFECTIONS_MODAL_SHOWN,
    value: shown,
  });
};

const checkLocation = () => (dispatch, getState) => {
  setAsBackgroundFetch(true)(dispatch);
  dispatch({
    type: actionTypes.SEND_GET_LOCATION,
    token: getState().user.token,
  });
};

const setAsBackgroundFetch = isBackground => dispatch => {
  dispatch({
    type: actionTypes.SET_AS_BACKGROUND_FETCH,
    value: isBackground,
  });
};

const hideError = () => dispatch =>
  dispatch({
    type: actionTypes.HIDE_ERROR,
  });

const startRequest = () => dispatch => {
  dispatch({
    type: actionTypes.REQUEST_STARTED
  })
}

const setRequestAsFailed = (reason) => dispatch => {
  dispatch({
    type: actionTypes.REQUEST_FAILED,
    payload: {
      status: 310,
      message: reason,
    }
  })
}

const setRequestAsSuccess = () => dispatch => {
  dispatch({
    type: actionTypes.REQUEST_SUCCESS
  })
}

// action creators
const ActionCreators = {
  startRequest,
  setRequestAsFailed,
  setRequestAsSuccess,
  hideError,
  setAsBackgroundCheck: setAsBackgroundFetch,
  checkLocation,
  possibleInfectionsModalShown,
  addPatientAssociate,
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
