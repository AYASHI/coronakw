import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../ReactotronConfig';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';
import languageReducer from '../locales/reducer';

import watchAuthSaga from '../features/auth/saga';
import watchHomeSaga from '../features/home/saga';
import {AsyncStorage} from 'react-native';
import coreReducer from '../features/core/reducer';
import watchOnBoardingSaga from '../features/onboarding/saga';

const persistConfig = {
  core: coreReducer,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language'],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  home: homeReducer,
  language: languageReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  pReducer,
  compose(
    applyMiddleware(thunk, sagaMiddleware),
    Reactotron.createEnhancer(),
  ),
);
export const persistor = persistStore(store);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchHomeSaga);
sagaMiddleware.run(watchOnBoardingSaga)

export default store;
