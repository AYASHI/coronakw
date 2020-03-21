import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';

function* tryLoginSaga(action) {}

function* registerSaga(action) {}

function* handleApiCall(apiCallYield, actionYield) {
  try {
    const json = yield apiCallYield;
    if (json.data.is_error) {
    } else {
      yield put(actionYield(json));
    }
  } catch (error) {
    console.log(error);
    // Construct an error message.  Should we use specific errors in actionTypes or general failure msg?  Depends how we're supposed to handle it.
    yield put({
      type: actionTypes.REQUEST_FAILED,
      payload: {
        status: error.response.status,
        message: error.response.statusText,
      },
    });
  }
}

function* validateCivilIdSaga(action) {
  const data = {civil_id: action.value};

  const json = axios
    .post(constants.BASE_URL + '/verifyCivilid', data)
    .then(response => response);
  yield handleApiCall(json, json => {
    return {
      type: actionTypes.CIVIL_ID_SENT,
      payload: {value: json.data.already_registered},
    };
  });
}

function* validatePhoneNumberSaga(action) {
  const data = {phone_number: action.value};
  
  const json = yield axios
  .post(constants.BASE_URL + '/verifyPhonenumber', data)
  .then(response => response);
  yield handleApiCall(json, json => {
    return {  
      type: actionTypes.PHONE_NUMBER_SENT,
      payload: {value: json.data.is_valid},
    };
  });
}

function* validateOTPSaga(action) {
  const data = {otp: action.value};
  
  const json = yield axios
  .post(constants.BASE_URL + '/verifyotp', data)
  .then(response => response);

  yield handleApiCall(json, json => {
    return {  
      type: actionTypes.OTP_SENT,
      payload: {value: json.data.is_valid},
    };
  });
}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.TRY_LOGIN, tryLoginSaga);
  yield takeLatest(actionTypes.TRY_REGISTER, registerSaga);
  yield takeLatest(actionTypes.PHONE_NUMBER_SEND, validatePhoneNumberSaga);
  yield takeLatest(actionTypes.CIVIL_ID_SEND, validateCivilIdSaga);
  yield takeLatest(actionTypes.SEND_OTP, validateOTPSaga);
}

export default watchAuthSaga;
