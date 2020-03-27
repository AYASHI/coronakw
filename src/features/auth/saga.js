import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';

function* validateCivilIdSaga(action) {
  const data = {...action.payload};

  const json = axios
    .post(constants.BASE_URL + '/Users/CheckCivilIdSerial', data)
    .then(response => response);
  yield handleApiCall(json, json => {
    return {
      type: actionTypes.CIVIL_ID_SENT,
      payload: {value: json.data.isSuccess},
    };
  });
}

function* validatePhoneNumberSaga(action) {
  const data = {
    MobileNumber: action.payload.phone,
    CivilId: action.payload.civilID,
    SerialNumber: action.payload.SerialNumber,
  };

  const json = axios
    .post(constants.BASE_URL + '/Users/SendOTP', data)
    .then(response => response);
  yield handleApiCall(json, json => {
    return {
      type: actionTypes.PHONE_NUMBER_SENT,
      payload: {value: json.data.isSuccess},
    };
  });
}

function* validateOTPSaga(action) {
  const data = {otp: action.value};

  const json = axios
    .post(constants.BASE_URL + '/verifyotp', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    return {
      type: actionTypes.OTP_SENT,
      payload: {value: json.data.is_valid},
    };
  });
}

function* checkIfUserIsRegistered(action) {
  const data = {userName: action.payload.civilID};

  const json = axios
    .get(constants.BASE_URL + '/Users/IsRegistered', {params: {...data}})
    .then(response => response);
  
  yield handleApiCall(json, json => {
    console.log('check if user is re', json);
    return {
      type: actionTypes.CHECK_ISREGISTERED_SENT,
      payload: {value: json.data.isRegistered},
    };
  });
}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.SEND_CHECK_ISREGISTERED, checkIfUserIsRegistered);
  yield takeLatest(actionTypes.PHONE_NUMBER_SEND, validatePhoneNumberSaga);
  yield takeLatest(actionTypes.CIVIL_ID_SEND, validateCivilIdSaga);
  yield takeLatest(actionTypes.SEND_OTP, validateOTPSaga);
}

export default watchAuthSaga;
