import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import images from '../../utils/images';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import {useTranslation} from 'react-i18next';
import * as actionTypes from '../../store/actionTypes';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules

// import i18n from 'i18next';

const LoginScreen = ({navigation, props}) => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  // const [lang, setLang] = useState(language);
  const dispatch = useDispatch();

  const login = () => {
    navigation.navigate('OnBoarding');
  };
  const changeLanguage = () => {
    let newLang = 'en';
    try {
      if (language == 'en') {
        newLang = 'ar';
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      // changeLanguage(newLang);
      i18n.changeLanguage(newLang);
      dispatch({
        type: actionTypes.CHANGE_LANGUAGE,
        value: newLang,
      });
      setTimeout(() => RNRestart.Restart(), 50);
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} />
      <Spacer />
      <Button text={t('auth.login_button')} onPress={login} />
      <Spacer />
      <TouchableOpacity onPress={changeLanguage}>
        <Text>{language == 'en' ? 'العربية' : 'English'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
