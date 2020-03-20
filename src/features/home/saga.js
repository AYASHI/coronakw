import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, takeEvery, put} from 'redux-saga/effects';

function* sendHealthStateSaga(action) {
  const data = {healthState: action.value};
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/healthState', data)
      .then(response => response);
    yield put({type: actionTypes.HEALTH_STATE_SENT});
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

function* sendSurvey(action) {
  let data = [];
  let answers = action.value;

  for (let key in answers) {
    data.push({
      question_id: key,
      answer: answers[key],
    });
  }
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/survey', data)
      .then(response => response);
    yield put({type: actionTypes.SURVEY_SENT});
  } catch (error) {
    console.log(error);
    yield put({
      type: actionTypes.REQUEST_FAILED,
      payload: {
        status: error.response.status,
        message: error.response.statusText,
      },
    });
  }
}

function* sendLocationSaga(action) {
  // const data = { healthState: action.value }
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/location', action.value)
      .then(response => response);
    yield put({type: actionTypes.LOCATION_SENT});
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

function* sendTemperatureSaga(action) {
  const data = {temperature: action.value};
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/temperature', data)
      .then(response => response);
    yield put({type: actionTypes.TEMPERATURE_SENT});
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

function* sendPossibleInfectionsSaga(action) {
  const data = action.value;
  try {
    const json = yield axios
      .post(constants.BASE_URL + '/possibleInfections', data)
      .then(response => response);
    yield put({type: actionTypes.POSSIBLE_INFECTIONS_SENT});
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
