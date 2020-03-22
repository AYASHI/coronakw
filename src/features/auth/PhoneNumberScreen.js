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
  AuthContainer,
  InstructionFragment,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import Screens from '../../navigators/Screens';
import Button from '../../components/Button';

const PhoneNumberScreen = ({navigation, validatePhoneNumber, isValid, showError}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    validatePhoneNumber(phoneNumber);
  };
  if (isValid != null || isValid != undefined) {
    if (isValid) {
      navigation.navigate(Screens.OTP);
    } else {
      alert('phone not valid');
    }
  }
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthContainer>
        <View style={styles.container}>
          <LogoFragment />
          <Spacer />
          <TitleFragment title={t('auth.enter_phone_number')} />
          <InstructionFragment title={t('auth.phone_number_instruction')} />
          <PhoneNumberInput
            placeholder={t('onboarding.phoneNumber')}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Spacer space={20} />
          <Button text={t('auth.login_next')} onPress={() => {
            if(phoneNumber.length == 0 || phoneNumber.length != 8) {
              showError(t('auth.phone_number_is_not_Valid'))
            } else {
              login()
            }
          }} />
        </View>
      </AuthContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('state: phone number', state);
  return {
    isValid: state.auth.isPhoneNumberValid ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showError: message => {
      dispatch({
        type: actionTypes.SHOW_ERROR,
          message: message
      })
    },
    validatePhoneNumber: phone =>
      dispatch({
        type: actionTypes.PHONE_NUMBER_SEND,
        value: phone,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneNumberScreen);
