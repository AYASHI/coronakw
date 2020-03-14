import * as actionTypes from '../../store/actionTypes';
import {takeLatest} from 'redux-saga/effects';

function* tryLoginSaga(action) {}

function* registerSaga(action) {}

function* watchAuthSaga() {
  yield takeLatest(actionTypes.TRY_LOGIN, tryLoginSaga);
  yield takeLatest(actionTypes.TRY_REGISTER, registerSaga);
}

export default watchAuthSaga;
