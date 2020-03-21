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
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};
export default App;
