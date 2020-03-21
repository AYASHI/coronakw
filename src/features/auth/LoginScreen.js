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

const LoginScreen = ({navigation, validateCivilId, isRegistered}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    validateCivilId(civilID);
    // navigation.navigate(Screens.Phone);
  };
  const [civilID, setCivilID] = useState('');
  if (isRegistered != null || isRegistered != undefined) {
    if (isRegistered) {
      navigation.navigate(Screens.Phone);
    } else {
      navigation.navigate(Screens.Registration);
    }
  }
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
      </AuthContainer>
    </SafeAreaView>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  return {
    isRegistered: state.auth.isRegistered ?? null,
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
