import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put, select, call} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';
import actions from '../../store/action';
import {getLatestLocation, requestPermission, configureLocation as configureLocationService, checkPermission} from '../../utils/Location'

function* getDeviceLocation(action) {
  
  configureLocationService()

  const isPermitted = yield checkPermission();
  try {
    if (isPermitted) {
      const location = yield getLatestLocation();
      const {latitude, longitude} = location;
      yield put({type: actionTypes.LATEST_LOCATION_SENT, value: {latitude, longitude}});
    } else {
      const granted = yield requestPermission()
      if (granted) {
        const location = yield getLatestLocation();
        const {latitude, longitude} = location;
        yield put({
          type: actionTypes.LATEST_LOCATION_SENT,
          value: {latitude, longitude},
        });
      }
      yield put({
        type: actionTypes.LOCATION_PERMISSION_REQUESTED,
        value: granted,
      });
    }
  } catch (error) {
    console.log('location error', error);
  }
}

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

function* remainingDaysSaga() {
  const token = yield select(state => state.user.token);
  const api = axios.create({headers: {Authorization: 'Bearer ' + token}});
  const {data} = yield api
    .get(constants.BASE_URL + '/Patients/QuarantineDays')
    .then(response => response);
  if (data.isSuccess) {
    yield put(actions.fetchRemainingDaysSuccess(data.data));
  } else {
    yield put(actions.fetchRemainingDaysSuccess());
  }
}

function* getLocation(action) {
  axios.defaults.headers.common.Authorization = `Bearer ${action.token}`;

  const json = axios
    .get(constants.BASE_URL + '/Patients/Location')
    .then(response => response);

  yield handleApiCall(
    json,
    json => {
      return {type: actionTypes.GET_LOCATION_SENT, payload: {...json.data}};
    },
    true,
  );

  // reset state
  yield put({type: actionTypes.SET_AS_BACKGROUND_FETCH, value: false});
  yield put({type: actionTypes.HIDE_ERROR});
}

function* watchHomeSaga() {
  yield takeLatest(actionTypes.SEND_GET_LOCATION, getLocation);
  yield takeLatest(actionTypes.SEND_SURVEY, sendSurvey);
  yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
  yield takeLatest(
    actionTypes.SEND_POSSIBLE_INFECTIONS,
    sendPossibleInfectionsSaga,
  );
  yield takeLatest(actionTypes.FETCH_REMAINING_DAYS, remainingDaysSaga);
  yield takeLatest(actionTypes.GET_DEVICE_LOCATION, getDeviceLocation);
}

export default watchHomeSaga;
