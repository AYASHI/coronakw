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
  AuthContainer,
  InstructionFragment,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import PhoneNumberInput from '../../components/PhoneNumberInput';

const PhoneNumberScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    navigation.navigate('OTP');
  };
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
          <SubmitButtonFragment title={t('auth.login_next')} action={login} />
        </View>
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
        type: actionTypes.PHONE_NUMBER_SEND,
        value: civilID,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneNumberScreen);
