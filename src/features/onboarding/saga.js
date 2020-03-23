import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';

function* register(action) {
  const data = {...action.value};
  
  const json = axios
    .post(constants.BASE_URL + '/register', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    return {type: actionTypes.REGISTER_SENT, payload: json.data.success};
  });
}

function* recordTemperature(action) {
    const data = {...action.value};
    
    const json = axios
      .post(constants.BASE_URL + '/temperature', data)
      .then(response => response);
  
    yield handleApiCall(json, json => {
      return {type: actionTypes.TEMPERATURE_SENT, payload: json.data.success};
    });
}

function* sendLocation(action) {
    const data = {...action.value};
    
    const json = axios
      .post(constants.BASE_URL + '/reportLocation', data)
      .then(response => response);
  
    yield handleApiCall(json, json => {
      return {type: actionTypes.LOCATION_SENT, payload: json.data.success};
    });
}

function* watchOnBoardingSaga() {
  yield takeLatest(actionTypes.SEND_REGISTER, register);
  yield takeLatest(actionTypes.SEND_TEMPERATURE, recordTemperature);
  yield takeLatest(actionTypes.SEND_LOCATION, sendLocation)
}

export default watchOnBoardingSaga;
