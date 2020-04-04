import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
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
import Button from '../../components/Button';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';
import {
  serialNumberValidation,
  civilidValidation,
  validateAll,
} from '../../utils/validation';

const LoginScreen = ({
  validateCivilId,
  setCivilInfo,
  showError,
}) => {
  const {t} = useTranslation();

  const submit = () => {
    const validations = [
      serialNumberValidation(serialNumber, t('validation.serialnumber')),
      civilidValidation(civilID, t('validation.civilid')),
    ];
    const validationResult = validateAll(validations);

    if (validationResult.valid) {
      setCivilInfo(civilID, serialNumber);
      validateCivilId(civilID, serialNumber);
    } else {
      showError(validationResult.message);
    }
  };

  const [civilID, setCivilID] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthContainer verticalOffset={50}>
        <View style={styles.container}>
          <LogoFragment />
          <TitleFragment title={t('auth.enter_civil_id')} />
          <InputFragment
            maxDigits={12}
            onChange={setCivilID}
            placeholder={t('auth.civil_id_placeholder')}
            title={t('auth.civil_id_instruction')}
          />
          <TitleFragment title={t('auth.enter_serial_number')} />
          <InputFragment
            maxDigits={10}
            onChange={setSerialNumber}
            placeholder={t('auth.serial_number_placeholder')}
            title={t('auth.serial_number_instruction')}
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
      setCivilInfo: ActionCreators.setCivilInformation,
      validateCivilId: ActionCreators.validateCivilId,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
