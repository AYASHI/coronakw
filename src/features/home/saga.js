import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';

var baseUrl = "https://29e02c26-6207-48f7-9f9e-5f98254acd64.mock.pstmn.io";

function* sendHealthStateSaga(action) {
    const data = {healthState: action.value}
    const json = yield axios.post(baseUrl + '/healthState', data).then(response => response.json(), );    
    yield put({ type: actionTypes.HEALTH_STATE_SENT });
  }


function* watchHomeSaga() {
    yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
}

export default watchHomeSaga;

  
