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
import Button from '../../components/Button';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';
import {otpValidation, validateAll} from '../../utils/validation';

const OTPScreen = ({registerUser, showError}) => {
  const {t} = useTranslation();

  const submit = () => {
    const validations = [otpValidation(otp, t('validation.otp'))];

    const validationResult = validateAll(validations);

    if (validationResult.valid) {
      registerUser(otp);
    } else {
      showError(validationResult.message);
    }
  };

  const [otp, setOTP] = useState('');

  return (
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
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      registerUser: ActionCreators.registerUser,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPScreen);
