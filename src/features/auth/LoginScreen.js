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
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';

const LoginScreen = ({
  navigation,
  validateCivilId,
  isRegistered,
  showError,
}) => {
  const {t, i18n} = useTranslation();

  const submit = () => {
    if (civilID.length == 0 || civilID.length != 12) {
      showError(t('auth.civil_id_is_not_valid'));
    } else {
      validateCivilId(civilID);
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
