import axios from 'axios';
import * as actionTypes from '../../../store/actionTypes';
import * as constants from '../../../utils/constants';
import {takeLatest, put, select} from 'redux-saga/effects';
import handleApiCall from '../../core/handleApiCall';
import * as actions from './actions'

function* fetchStatusCategoriesSaga() {
    // Get token from redux
    const token =  yield select(state=>  state.user.token )
    const api = axios.create({headers: {Authorization: 'Bearer ' + token}})
    const json = yield api.get(constants.BASE_URL + '/QuestionCategories/List')
    .then(response => response);
  yield handleApiCall(json, response => {
    return {type: actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS, payload: response.data.data};
  });
  }


function* fetchQuestionsSaga() {
  // Get token from redux
  const token =  yield select(state=>  state.user.token )
  const api = axios.create({headers: {Authorization: 'Bearer ' + token}})
  const json = yield api.get(constants.BASE_URL + '/Questions/List')
  .then(response => response);
  
  if(json.data) {
    yield put(actions.fetchQuestionsSuccess(json.data))
  } else {
    yield put(actions.fetchQuestionsFailed())
  }
}
  function* watchHealthStatusSaga() {
    yield takeLatest(actionTypes.FETCH_STATUS_CATEGORIES, fetchStatusCategoriesSaga);
    yield takeLatest(actionTypes.FETCH_QUESTIONS, fetchQuestionsSaga);
  }
  
  export default watchHealthStatusSaga;