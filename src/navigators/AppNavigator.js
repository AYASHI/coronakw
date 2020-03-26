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

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  const screen = language ? 'Login' : 'Language';
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName={screen}>
        <Stack.Screen name={Screens.Language} name={"Language"} component={LanguageScreen} />
        <Stack.Screen name={Screens.Login} name={"Login"} component={LoginScreen} />
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
        />
        <Stack.Screen name={Screens.Home} component={HomeScreen} />

        <Stack.Screen name={Screens.Phone} component={PhoneNumberScreen} />
        <Stack.Screen name={Screens.OTP} component={OTPScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WithLoadingHud(WithErrorDisplay(AppNavigator));
