import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import images from '../../utils/images';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';

const LoginScreen = ({navigation}) => {
  const login = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Image source={images.logo} />
      <Spacer />
      <Button text={'تسجيل الدخول'} onPress={login} />
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
