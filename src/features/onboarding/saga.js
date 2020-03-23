import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';

function* register(action) {
  const data = {healthState: action.value};

  const json = axios
    .post(constants.BASE_URL + '/register', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    return {type: actionTypes.HEALTH_STATE_SENT, payload: json.data.success};
  });
}
 
function* watchOnBoardingSaga() {
  yield takeLatest(actionTypes.SEND_REGISTER, register);
}

export default watchOnBoardingSaga;
