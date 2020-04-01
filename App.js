/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/store';
import AppNavigator from './src/navigators/AppNavigator';
import {PersistGate} from 'redux-persist/lib/integration/react';
import './i18n';
import FlashMessage from 'react-native-flash-message';
console.disableYellowBox = true;
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};
export default App;
