import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import images from '../../utils/images';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import {useTranslation} from 'react-i18next';
import Screens from '../../navigators/Screens';

const LoginScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    navigation.navigate(Screens.Registration);
  };
  return (
    <View style={styles.container}>
      <Image source={images.logo} />
      <Spacer />
      <Button text={t('auth.login_button')} onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
