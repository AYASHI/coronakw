import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import styles from './styles';
import {
  LogoFragment,
  TitleFragment,
  SubmitButtonFragment,
  InputFragment,
  AuthContainer,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import * as actionTypes from '../../store/actionTypes';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Screens from '../../navigators/Screens';

const LoginScreen = ({
  navigation,
  validateCivilId,
  isRegistered,
  showError,
}) => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  // const [lang, setLang] = useState(language);
  const dispatch = useDispatch();

  const login = () => {
    validateCivilId(civilID);
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

  const [civilID, setCivilID] = useState('');
  if (isRegistered != null || isRegistered != undefined) {
    if (isRegistered) {
      navigation.navigate(Screens.Phone);
    } else {
      navigation.navigate(Screens.Registration);
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthContainer>
        <View style={styles.container}>
          <LogoFragment />
          <Spacer />
          <TitleFragment title={t('auth.enter_civil_id')} />
          <InputFragment
            maxDigits={12}
            onChange={setCivilID}
            placeholder={t('auth.civil_id_placeholder')}
            title={t('auth.civil_id_instruction')}
          />
          <Spacer space={20} />
          <SubmitButtonFragment
            title={t('auth.login_next')}
            action={() => {
              if (civilID.length == 0 || civilID.length != 12) {
                showError(t('auth.civil_id_is_not_valid'));
              } else {
                login();
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={changeLanguage}
          style={{alignSelf: 'center'}}>
          <Text>{language == 'en' ? 'العربية' : 'English'}</Text>
        </TouchableOpacity>
      </AuthContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isRegistered: state.auth.isRegistered ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showError: message => {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        message: message,
      });
    },
    validateCivilId: civilID =>
      dispatch({
        type: actionTypes.CIVIL_ID_SEND,
        value: civilID,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
