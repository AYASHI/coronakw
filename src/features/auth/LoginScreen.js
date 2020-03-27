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
import Screens from '../../navigators/Screens';
import Button from '../../components/Button';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';

const LoginScreen = ({checkIsUserRegistered, navigation, setCivilInfo, isRegistered, showError}) => {
  const {t, i18n} = useTranslation();

  const submit = () => {
    if (civilID.length == 0 || civilID.length != 12) {
      showError(t('auth.civil_id_is_not_valid'));
    } else {
      setCivilInfo(civilID, serialNumber);
      checkIsUserRegistered(civilID, serialNumber)
    }
  };

  const [civilID, setCivilID] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

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
  return {
    isRegistered: state.auth.isRegistered ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      setCivilInfo: ActionCreators.setCivilInformation,
      checkIsUserRegistered: ActionCreators.checkIsUserRegistered
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
