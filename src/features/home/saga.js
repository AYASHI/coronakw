import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';

function* sendHealthStateSaga(action) {
  const data = {healthState: action.value};

  const json = axios
    .post(constants.BASE_URL + '/healthState', data)
    .then(response => response);
  yield handleApiCall(json, _ => {
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

  const json = axios
    .post(constants.BASE_URL + '/survey', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    return {type: actionTypes.SURVEY_SENT};
  });
}

function* getQuestionsList() {
  const json = axios
    .get(constants.BASE_URL + '/QuestionsCategories/List')
    .then(response => response);

  yield handleApiCall(json, json => {
    return {type: actionTypes.QUESTIONS_FETCHED};
  });
}

function* sendPossibleInfectionsSaga(action) {
  const data = action.payload;
  axios.defaults.headers.common.Authorization = `Bearer ${action.token}`;

  const json = axios
    .post(constants.BASE_URL + '/PatientAssociates/Create', data)
    .then(response => response);

  yield handleApiCall(json, json => {
    return {type: actionTypes.POSSIBLE_INFECTIONS_SENT};
  });
}

function* getLocation(action) {
  axios.defaults.headers.common.Authorization = `Bearer ${action.token}`;

  const json = axios
    .get(constants.BASE_URL + '/Patients/Location')
    .then(response => response);

  yield handleApiCall(json, _ => {
    return {type: actionTypes.GET_LOCATION_SENT, payload: {...json.data}};
  });
}

function* watchHomeSaga() {
  yield takeLatest(actionTypes.SEND_GET_LOCATION, getLocation);
  yield takeLatest(actionTypes.FETCH_QUESTIONS, getQuestionsList);
  yield takeLatest(actionTypes.SEND_SURVEY, sendSurvey);
  yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
  yield takeLatest(
    actionTypes.SEND_POSSIBLE_INFECTIONS,
    sendPossibleInfectionsSaga,
  );
}

export default watchHomeSaga;
