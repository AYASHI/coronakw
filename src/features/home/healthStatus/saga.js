import axios from 'axios';
import * as actionTypes from '../../../store/actionTypes';
import * as constants from '../../../utils/constants';
import {takeLatest, put, select} from 'redux-saga/effects';
import handleApiCall from '../../core/handleApiCall';
import * as actions from './actions';
import reactotron from 'reactotron-react-native';
import * as NavigationService from '../../../navigators/NavigationService'
import { showMessage } from 'react-native-flash-message';
function* fetchStatusCategoriesSaga() {
  // Get token from redux
  const token = yield select(state => state.user.token);
  const api = axios.create({headers: {Authorization: 'Bearer ' + token}});
  const json = yield api
    .get(constants.BASE_URL + '/QuestionCategories/List')
    .then(response => response);
  yield handleApiCall(json, response => {
    return {
      type: actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS,
      payload: response.data.data,
    };
  });
}

function* fetchQuestionsSaga({payload}) {
  // Get token from redux
  const token = yield select(state => state.user.token);
  const api = axios.create({headers: {Authorization: 'Bearer ' + token}});
  let params = {...payload, longitude: 47.988214, latitude: 29.373214};
  const {data} = yield api
    .post(constants.BASE_URL + '/Questions/List', params)
    .then(response => response);

  if (data) {
    yield put(actions.fetchQuestionsSuccess(data));
  } else {
    yield put(actions.fetchQuestionsFailed());
  }
}

function* submitAnswersSaga({payload}) {
  // Get token from redux
  const token = yield select(state => state.user.token);
  const api = axios.create({headers: {Authorization: 'Bearer ' + token}});
  const {data} = yield api
    .post(constants.BASE_URL + '/Questions/Answer', payload)
    .then(response => response);
  if (data) {
    yield put(actions.submitAnswersSuccess());
    NavigationService.goBack()
    showMessage({message: data.message, type: 'success'})
  } else {
    yield put(actions.submitAnswersFailed());
    showMessage({message: data.message, type: 'warning'})
  }
}

function* watchHealthStatusSaga() {
  yield takeLatest(actionTypes.FETCH_STATUS_CATEGORIES,fetchStatusCategoriesSaga,);
  yield takeLatest(actionTypes.FETCH_QUESTIONS, fetchQuestionsSaga);
  yield takeLatest(actionTypes.SUBMIT_ANSWERS, submitAnswersSaga);
}

export default watchHealthStatusSaga;
