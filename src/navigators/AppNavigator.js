import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import LoginScreen from '../features/auth/LoginScreen';
import RegistrationScreen from '../features/onboarding/RegistrationScreen';
import TakeTemperatureScreen from '../features/onboarding/TakeTemperatureScreen';
import Screens from './Screens';
import TakeLocationScreen from '../features/onboarding/TakeLocationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={Screens.Login} component={LoginScreen} />
        <Stack.Screen
          name={Screens.Registration}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name={Screens.TakeTemperature}
          component={TakeTemperatureScreen}
        />
        <Stack.Screen name={Screens.Home} component={HomeScreen} />
        <Stack.Screen
          name={Screens.TakeLocation}
          component={TakeLocationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
