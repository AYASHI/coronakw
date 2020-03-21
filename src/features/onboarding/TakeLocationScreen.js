import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../../components/Button';
import {useTranslation} from 'react-i18next';
import Screens from '../../navigators/Screens';
import images from '../../utils/images';
import layout from '../../utils/layout';
import LocationView from '../../components/LocationView';
import CustomTextInput from '../../components/CustomTextInput';
import DropDown from '../../components/DropDown';
import {areas} from '../../utils/mockData';
import Spacer from '../../components/Spacer';
import PhoneNumberInput from '../../components/PhoneNumberInput';

const TakeLocationScreen = ({navigation}) => {
  const {t} = useTranslation();

  const confirm = () => {
    navigation.navigate(Screens.Home);
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <Image source={images.locationLarge} />

        <Text style={styles.contentSubTitle}>
          {t('onboarding.quarantineLocationTitle')}
        </Text>
        <Text style={styles.contentTitle}>
          {t('onboarding.quarantineLocationSubTitle')}
        </Text>
      </View>
    );
  };
  const onLocationSelected = location => {};

  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior="position"
          enabled
          keyboardVerticalOffset={100}>
          <Header />
          <LocationView
            onLocationSelected={onLocationSelected}
            color={'#f5f5f9'}
          />
          <DropDown placeholder={t('placeholder.area')} data={areas} />
          <Spacer />
          <CustomTextInput title={t('placeholder.street')} />
          <Spacer />
          <CustomTextInput title={t('placeholder.block')} />
          <Spacer />
          <PhoneNumberInput placeholder={t('placeholder.phoneNumber')} />
          <Spacer />
          <Button text={t('button.confirm')} onPress={confirm} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  saveArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  container: {
    margin: layout.margin,
    flex: 1,
  },
  contentSubTitle: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  contentTitle: {
    color: '#616161',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'stretch',
  },
});

export default TakeLocationScreen;
