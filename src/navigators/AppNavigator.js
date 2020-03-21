import React, {useEffect }from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import LoginScreen from '../features/auth/LoginScreen';
import RegistrationScreen from '../features/onboarding/RegistrationScreen';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'OnBoarding'} component={RegistrationScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
