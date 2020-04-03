import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import LoginScreen from '../features/auth/LoginScreen';
import LanguageScreen from '../features/auth/LanguageScreen';
import RegistrationScreen from '../features/onboarding/RegistrationScreen';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import TakeTemperatureScreen from '../features/onboarding/TakeTemperatureScreen';
import Screens from './Screens';
import TakeLocationScreen from '../features/onboarding/TakeLocationScreen';
import PhoneNumberScreen from '../features/auth/PhoneNumberScreen';
import OTPScreen from '../features/auth/OTPScreen';
import WithErrorDisplay from '../features/core/WithErrorDisplay';
import WithLoadingHud from '../features/core/WithLoadingHud';
import {isnull} from '../utils/validation';
import QuestionsScreen from '../features/home/healthStatus/QuestionsScreen';
import * as NavigationService from './NavigationService';
import WebViewScreen from '../features/livechat/WebViewScreen';
import colors from '../utils/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  const token = useSelector(state => state.user.token);

  let screen = language ? Screens.Login : Screens.Language;

  if (!isnull(token)) {
    screen = Screens.Home;
  }

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer
      ref={nav => {
        NavigationService.setNavigator(nav);
      }}>
      <Stack.Navigator  initialRouteName={screen} screenOptions ={{headerTitle: ' ', headerTintColor: colors.gray, headerShown: false}}>
        <Stack.Screen name={Screens.Language} component={LanguageScreen} />
        <Stack.Screen name={Screens.Login} component={LoginScreen} />
        <Stack.Screen
          name={Screens.Registration}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name={Screens.TakeTemperature}
          component={TakeTemperatureScreen}
        />

        <Stack.Screen
          name={Screens.TakeLocation}
          component={TakeLocationScreen}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen name={Screens.Home} component={HomeScreen} />
        <Stack.Screen name={Screens.Phone} component={PhoneNumberScreen} />
        <Stack.Screen name={Screens.OTP} component={OTPScreen} />
        <Stack.Screen name={Screens.Questions} component={QuestionsScreen} />
        <Stack.Screen name={Screens.LiveChat} component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WithLoadingHud(WithErrorDisplay(AppNavigator));
