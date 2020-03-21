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

// import i18n from 'i18next';

const LoginScreen = ({navigation, props}) => {
  const {t, i18n} = useTranslation();
  const language = useSelector(state => state.language.current);
  // const [lang, setLang] = useState(language);
  const dispatch = useDispatch();

  const login = () => {
    navigation.navigate(Screens.Phone);
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
          <SubmitButtonFragment title={t('auth.login_next')} action={login} />
        </View>
        <TouchableOpacity onPress={changeLanguage} style={{alignSelf:'center',}}>
          <Text>{language == 'en' ? 'العربية' : 'English'}</Text>
        </TouchableOpacity>
      </AuthContainer>
    </SafeAreaView>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  return {
    isValid: true,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    validateCivilId: civilID =>
      dispatch({
        type: actionTypes.CIVIL_ID_SEND,
        value: civilID,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
