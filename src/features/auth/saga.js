import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';

function* tryLoginSaga(action) {}

function* registerSaga(action) {}

function* validateCivilIdSaga(action) {
  const data = {civil_id: action.value};
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/civilid', data)
      .then(response => response);
    yield put({type: actionTypes.CIVIL_ID_SENT, value: json.data.isValid});
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

function* validatePhoneNumberSaga(action) {
  const data = {phone_number: action.value};
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/phonenumber', data)
      .then(response => response);
    yield put({type: actionTypes.PHONE_NUMBER_SENT});
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

function* validateOTPSaga(action) {}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.TRY_LOGIN, tryLoginSaga);
  yield takeLatest(actionTypes.TRY_REGISTER, registerSaga);
  yield takeLatest(actionTypes.PHONE_NUMBER_SEND, validatePhoneNumberSaga);
  yield takeLatest(actionTypes.CIVIL_ID_SEND, validateCivilIdSaga);
  yield takeLatest(actionTypes.SEND_OTP, validateOTPSaga);
}

export default watchAuthSaga;
