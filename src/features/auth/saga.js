import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';
import Screens from '../../navigators/Screens';
import * as NavigationService from '../../navigators/NavigationService';

function* validateCivilIdSaga(action) {
  const data = {...action.payload};

  const json = axios
    .post(constants.BASE_URL + '/Users/CheckSerialCIDNumber', data)
    .then(response => response);
  yield handleApiCall(json, json => {

    if (json.data.isSuccess) {
      NavigationService.navigate(Screens.Phone, {})
    }

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
    SerialNumber: action.payload.serialNumber,
  };

  const json = axios
    .post(constants.BASE_URL + '/Users/SendOTP', data)
    .then(response => response);
  yield handleApiCall(json, json => {

    if (json.data.isSuccess) {
      NavigationService.navigate(Screens.OTP, {})
    }

    return {
      type: actionTypes.PHONE_NUMBER_SENT,
      payload: {value: json.data.isSuccess},
    };
  });
}


function* register(action) {
  const data = {...action.value};

  const json = axios
    .post(constants.BASE_URL + '/Users/Register', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    if (json.data.data) {
      NavigationService.navigate(Screens.Home, {})
    }
    return {type: actionTypes.REGISTER_SENT, payload: json.data.data};
  });
}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.PHONE_NUMBER_SEND, validatePhoneNumberSaga);
  yield takeLatest(actionTypes.CIVIL_ID_SEND, validateCivilIdSaga);
  yield takeLatest(actionTypes.SEND_REGISTER, register);
}

export default watchAuthSaga;
