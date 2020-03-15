/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigators/AppNavigator';
import {I18nManager} from 'react-native';
const App = () => {
  I18nManager.forceRTL(true); // Change app layout to RTL
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
export default App;
