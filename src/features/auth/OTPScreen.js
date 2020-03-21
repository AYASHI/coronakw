import React, {useState} from 'react';
import {View} from 'react-native';

import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes';
import styles from './styles';
import {
  LogoFragment,
  TitleFragment,
  SubmitButtonFragment,
  InputFragment,
  AuthContainer,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import Screens from '../../navigators/Screens';

const LoginScreen = ({navigation, isValid, validateOTP}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    validateOTP(otp)
  };
  const [otp, setOTP] = useState('');
  if (isValid != null || isValid != undefined) {
    if (isValid) {
      navigation.navigate(Screens.Registration);
    } else {
      alert('code is not valid');
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthContainer>
        <View style={styles.container}>
          <LogoFragment />
          <Spacer />
          <TitleFragment title={t('auth.enter_otp')} />
          <InputFragment
            onChange={setOTP}
            placeholder={t('auth.otp_placeholder')}
            title={t('auth.otp_instruction')}
          />
          <Spacer space={20} />
          <SubmitButtonFragment title={t('auth.login_button')} action={login} />
        </View>
      </AuthContainer>
    </SafeAreaView>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  return {
    isValid: state.auth.isOTPVerified ?? null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    validateOTP: otp =>
      dispatch({
        type: actionTypes.SEND_OTP,
        value: otp,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
