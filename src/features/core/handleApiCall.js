import axios from 'axios';
import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';
import {takeLatest, put} from 'redux-saga/effects';

export default function* handleApiCall(apiCall, action) {
  try {
    const json = yield apiCall;
    if (json.data.is_error) {
      yield put({
        type: actionTypes.REQUEST_FAILED,
        payload: {
          status: 300,
          message: json.data.error_message,
        },
      });
    } else {
      yield put(action(json));
    }
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
