import React from 'react';
import {View, Image, StyleSheet, Text, I18nManager} from 'react-native';
import images from '../../utils/images';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import {useTranslation} from 'react-i18next';
import TextField from '../../components/TextField';
import fonts from '../../utils/fonts';
import colors from '../../utils/colors';
import PhoneNumberInput from '../../components/PhoneNumberInput';

const PhoneNumberScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const login = () => {
    navigation.navigate('OTP');
  };
  
  return (
    <View style={styles.container}>
      <Image style ={styles.logo} source={images.logo} />
      <Spacer />
      <Text style={styles.instructionText}>
        {t('auth.civil_id_instruction')}
      </Text>
      <PhoneNumberInput></PhoneNumberInput>
      <Spacer />
      <View style={{width: '90%'}}>
        <Button text={t('auth.login_button')} onPress={login} />
      </View>
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
  instructionText: {
    textAlign: 'left',
    fontFamily: fonts.Bold,
    color: colors.marine,
    fontSize: 20,
    width: '90%',
  },
  logo: {
    width: 161,
    height: 240,
    marginBottom: 60,
    resizeMode: 'contain'
  }
});

export default PhoneNumberScreen;
