import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';

var baseUrl = "https://29e02c26-6207-48f7-9f9e-5f98254acd64.mock.pstmn.io";

function* sendHealthStateSaga(action) {
  const data = { healthState: action.value }
  try {
    const json = yield axios.post(baseUrl + '/healthState', data).then(response => response.json());
    yield put({ type: actionTypes.HEALTH_STATE_SENT });

  }
  catch (error) {
    console.log(error);
    // Construct an error message
    yield put({ type: actionTypes.REQUEST_FAILED, payload: { status: error.response.status, message: error.response.statusText } });
  }
}

function* sendSurvey(action) {
  let data = [];
  let answers = action.value;

  for (let key in answers) {
    data.push({
      question_id: key,
      answer: answers[key]
    });
  }
  try {

    const json = yield axios.post(baseUrl + '/survey', data).then(response => response);
    yield put({ type: actionTypes.SURVEY_SENT });
  }
  catch (error) {
    console.log(error);
    yield put({ type: actionTypes.REQUEST_FAILED, payload: { status: error.response.status, message: error.response.statusText } });
  }

}


function* watchHomeSaga() {
  yield takeLatest(actionTypes.SEND_SURVEY, sendSurvey);
  yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
}

export default watchHomeSaga;


