/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/store';
import AppNavigator from './src/navigators/AppNavigator';
import {PersistGate} from 'redux-persist/lib/integration/react';
import './i18n';
import Instabug from 'instabug-reactnative';
import FlashMessage from 'react-native-flash-message';
console.disableYellowBox = true;
const App = () => {
  useEffect(() => {
    Instabug.startWithToken('YOUR_INSTABUG_KEY_HERE', [
      Instabug.invocationEvent.shake,
    ]);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <FlashMessage position="bottom" />
      </PersistGate>
    </Provider>
  );
};
export default App;
