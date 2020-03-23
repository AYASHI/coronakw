import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  LogoFragment,
  TitleFragment,
  InputFragment,
  AuthContainer,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import * as actionTypes from '../../store/actionTypes';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Screens from '../../navigators/Screens';
import Button from '../../components/Button';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';

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

  const submit = () => {
    if (civilID.length == 0 || civilID.length != 12) {
      showError(t('auth.civil_id_is_not_valid'));
    } else {
      validateCivilId(civilID);
    }
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
  useEffect(() => {
    if (isRegistered != null || isRegistered != undefined) {
      if (isRegistered) {
        navigation.navigate(Screens.Phone);
      } else {
        navigation.navigate(Screens.Registration);
      }
    }
  });
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
          <Button text={t('auth.login_next')} onPress={submit} />
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
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      validateCivilId: ActionCreators.validateCivilId,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
