import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';

export default function* handleApiCall(apiCall, action) {
  try {
    yield put({type: actionTypes.REQUEST_STARTED});
    const json = yield apiCall;
    if (!json.data.isSuccess) {
      yield put({
        type: actionTypes.REQUEST_FAILED,
        payload: {
          status: 300,
          message: json.data.message,
        },
      });
    } else {
      yield put(action(json));
    }
    yield put({type: actionTypes.REQUEST_SUCCESS, value: json.data.message});
  } catch (error) {
    yield put({
      type: actionTypes.REQUEST_FAILED,
      payload: {
        status: error.response.status,
        message: error.response.statusText,
      },
    });
  }
}
