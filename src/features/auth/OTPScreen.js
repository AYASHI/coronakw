import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import styles from './styles';
import {
  LogoFragment,
  TitleFragment,
  InputFragment,
  AuthContainer,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import Screens from '../../navigators/Screens';
import Button from '../../components/Button';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';

const OTPScreen = ({navigation, isValid, validateOTP, showError}) => {
  const {t} = useTranslation();

  const submit = () => {
    if (otp.length == 0) {
      showError(t('auth.otp_is_not_valid'));
    } else {
      validateOTP(otp);
    }
  };

  const [otp, setOTP] = useState('');
  useEffect(() => {
    if (isValid != null || isValid != undefined) {
      if (isValid) {
        navigation.navigate(Screens.Registration);
      } else {
        alert('code is not valid');
      }
    }
  });
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
          <Button text={t('auth.login_button')} onPress={submit} />
        </View>
      </AuthContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    isValid: state.auth.isOTPVerified ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      validateOTP: ActionCreators.validateOTP,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPScreen);
