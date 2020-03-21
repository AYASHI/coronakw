import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import homeReducer from '../features/home/reducer';
import authReducer from '../features/auth/reducer';
import languageReducer from '../locales/reducer';

import watchAuthSaga from '../features/auth/saga';
import watchHomeSaga from '../features/home/saga';
import {AsyncStorage} from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language'],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  language: languageReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(pReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchHomeSaga);


export default store;
