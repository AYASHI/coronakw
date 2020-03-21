import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';
import languageReducer from '../locales/reducer';

import watchAuthSaga from '../features/auth/saga';
import watchHomeSaga from '../features/home/saga';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  language: languageReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchHomeSaga);

export default store;
