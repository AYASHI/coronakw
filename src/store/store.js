import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';

import watchAuthSaga from '../features/auth/saga';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuthSaga);

export default store;
