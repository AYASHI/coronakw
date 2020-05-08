import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Spacer from '../../components/Spacer';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  LogoFragment,
  TitleFragment,
  AuthContainer,
  InstructionFragment,
} from './AuthComponents';
import {useTranslation} from 'react-i18next';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import Button from '../../components/Button';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {phoneNumberValidation, validateAll} from '../../utils/validation';

const PhoneNumberScreen = ({validatePhoneNumber, showError}) => {
  const {t} = useTranslation();
  const submit = () => {
    const validations = [
      phoneNumberValidation(phoneNumber, t('validation.phonenumber')),
    ];

    const validationResult = validateAll(validations);

    if (validationResult.valid) {
      validatePhoneNumber(phoneNumber);
    } else {
      showError(validationResult.message);
    }
  };

  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthContainer>
        <View style={styles.container}>
          <LogoFragment />
          <TitleFragment title={t('auth.enter_phone_number')} />
          <InstructionFragment title={t('auth.phone_number_instruction')} />
          <PhoneNumberInput
            placeholder={t('onboarding.phoneNumber')}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Spacer space={20} />
          <Button text={t('auth.login_next')} onPress={submit} />
        </View>
      </AuthContainer>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      validatePhoneNumber: ActionCreators.validatePhoneNumber,
    },
    dispatch,
  );
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneNumberScreen);
