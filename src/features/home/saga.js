import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';

function* sendHealthStateSaga(action) {
  const data = {healthState: action.value};

  const json = yield axios
    .post(constants.BASE_URL + '/healthState', data)
    .then(response => response);
  handleApiCall(json, json => {
    return {type: actionTypes.HEALTH_STATE_SENT};
  });
}

function* sendSurvey(action) {
  let data = [];
  let answers = action.value;

  for (let key in answers) {
    data.push({
      question_id: key,
      answer: answers[key],
    });
  }

  const json = yield axios
    .post(constants.BASE_URL + '/survey', data)
    .then(response => response);
  yield put({type: actionTypes.SURVEY_SENT});

  handleApiCall(json, json => {
    return {type: actionTypes.SURVEY_SENT};
  });
}

function* sendLocationSaga(action) {
  const json = yield axios
    .post(constants.BASE_URL + '/location', action.value)
    .then(response => response);
  yield put({type: actionTypes.LOCATION_SENT});
  handleApiCall(json, json => {
    return {type: actionTypes.LOCATION_SENT};
  });
}

function* sendTemperatureSaga(action) {
  const data = {temperature: action.value};
  const json = yield axios
    .post(constants.BASE_URL + '/temperature', data)
    .then(response => response);
  handleApiCall(json, json => {
    return {type: actionTypes.TEMPERATURE_SENT};
  });
}

function* sendPossibleInfectionsSaga(action) {
  const data = action.value;

  const json = yield axios
    .post(constants.BASE_URL + '/possibleInfections', data)
    .then(response => response);

  handleApiCall(json, json => {
    return {type: actionTypes.POSSIBLE_INFECTIONS_SENT};
  });
}

function* watchHomeSaga() {
  yield takeLatest(actionTypes.SEND_SURVEY, sendSurvey);
  yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
  yield takeLatest(actionTypes.SEND_LOCATION, sendLocationSaga);
  yield takeLatest(actionTypes.SEND_TEMPERATURE, sendTemperatureSaga);
  yield takeLatest(
    actionTypes.SEND_POSSIBLE_INFECTIONS,
    sendPossibleInfectionsSaga,
  );
}

export default watchHomeSaga;
