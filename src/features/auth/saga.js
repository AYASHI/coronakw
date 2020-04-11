import * as actionTypes from '../../store/actionTypes';
import {takeLatest, put, call} from 'redux-saga/effects';
import Screens from '../../navigators/Screens';
import * as NavigationService from '../../navigators/NavigationService';
import APIs from '../../api/APIs';
import actions from './actions';

function* validateNationalIdSaga(action) {
  const response = yield call( APIs.validateUserNationalID, action.payload)
  if (response.isSuccess) {
    NavigationService.navigate(Screens.Phone);
   yield put(actions.validateNationalIDSuccess(response.isSuccess))
  }
}

function* validatePhoneNumberSaga(action) {
  const payload = {
    MobileNumber: action.payload.phone,
    CivilId: action.payload.civilID,
    SerialNumber: action.payload.serialNumber,
  };

  const response = yield call( APIs.validatePhoneNumber, payload)
  if (response.isSuccess) {
    NavigationService.navigate(Screens.OTP);
   yield put(actions.validatePhoneNumberSuccess(response.isSuccess))
  }
}

function* registerSaga(action) {
  const response = yield call( APIs.registerUser, action.payload)
  if (response.isSuccess) {
    NavigationService.navigate(Screens.Home);
   yield put(actions.registrationSuccess(response.data))
  }
}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.PHONE_NUMBER_SEND, validatePhoneNumberSaga);
  yield takeLatest(actionTypes.CIVIL_ID_SEND, validateNationalIdSaga);
  yield takeLatest(actionTypes.SEND_REGISTER, registerSaga);
}

export default watchAuthSaga;
