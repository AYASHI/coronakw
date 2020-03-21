import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../ReactotronConfig';
import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';

import watchAuthSaga from '../features/auth/saga';
import watchHomeSaga from '../features/home/saga';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    Reactotron.createEnhancer(),
  ),
);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchHomeSaga);

export default store;
