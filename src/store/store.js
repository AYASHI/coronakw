import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../ReactotronConfig';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';
import languageReducer from '../locales/reducer';

import watchAuthSaga from '../features/auth/saga';
import watchHomeSaga from '../features/home/saga';
import {AsyncStorage} from 'react-native';
import coreReducer from '../features/core/reducer';
import watchOnBoardingSaga from '../features/onboarding/saga';
import onBoardingReducer, {userReducer} from '../features/onboarding/reducer';

const persistConfig = {
  core: coreReducer,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language', 'user'],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
// persistConfig.storage.removeItem('persist:root')

const logger = createLogger({
  predicate: (getState, action) => true,
  collapsed: true,
  duration: true,
});

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  home: homeReducer,
  language: languageReducer,
  boarding: onBoardingReducer,
  user: userReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  pReducer,
  compose(
    applyMiddleware(thunk, sagaMiddleware, logger),
    Reactotron.createEnhancer(),
  ),
);
export const persistor = persistStore(store);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchHomeSaga);
sagaMiddleware.run(watchOnBoardingSaga);

export default store;
