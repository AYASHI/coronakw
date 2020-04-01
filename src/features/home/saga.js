import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put, select} from 'redux-saga/effects';
import handleApiCall from '../core/handleApiCall';
import reactotron from 'reactotron-react-native';
import actions from '../../store/action'
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
  axios.defaults.headers.common['Authorization'] = `Bearer ${action.token}`;

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
    if(data.isSuccess) {
      yield put(actions.fetchRemainingDaysSuccess(data.data))
    } else {
      yield put(actions.fetchRemainingDaysSuccess())
    }
  
}


function* watchHomeSaga() {
  yield takeLatest(actionTypes.SEND_SURVEY, sendSurvey);
  yield takeLatest(actionTypes.SEND_HEALTH_STATE, sendHealthStateSaga);
  yield takeLatest(
    actionTypes.SEND_POSSIBLE_INFECTIONS,
    sendPossibleInfectionsSaga,
  );
  yield takeLatest(actionTypes.FETCH_REMAINING_DAYS, remainingDaysSaga);
}

export default watchHomeSaga;
