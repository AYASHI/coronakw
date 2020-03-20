import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import images from '../../utils/images';
import {useTranslation} from 'react-i18next';
import fonts from '../../utils/fonts';
import colors from '../../utils/colors';
import layout from '../../utils/layout';
import CustomTextInput from '../../components/CustomTextInput';
import Spacer from '../../components/Spacer';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import YesNoQuestion from '../../components/YesNoQuestion';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';

const RegistrationScreen = () => {
  const {t} = useTranslation();
  const [civilID, setCivilID] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const HeaderFragment = () => {
    return (
      <View style={styles.header}>
        <Image source={images.id} />
        <Text style={styles.title}>{t('onboarding.personalInfo')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.infoAccuracy')}</Text>
      </View>
    );
  };
  const CountrySelectionFragment = () => {
    return (
      <Fragment>
        <Text style={styles.countrySelectionTitle}>
          {t('onboarding.selectCountries')}
        </Text>
        <DropDown placeholder={t('placeholder.selectCountries')} />
      </Fragment>
    );
  };
  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView style={styles.container}>
        <HeaderFragment />
        <CustomTextInput
          title={t('onboarding.civilId')}
          value={civilID}
          onChangeText={setCivilID}
        />
        <Spacer />
        <CustomTextInput
          title={t('onboarding.fullName')}
          value={fullName}
          onChangeText={setFullName}
        />
        <Spacer />
        <Spacer />
        <PhoneNumberInput
          placeholder={t('onboarding.phoneNumber')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Spacer space={32} />
        <YesNoQuestion onQuestionSelected={index => {}} />
        <Spacer space={32} />
        <CountrySelectionFragment />
        <Spacer space={32} />
        <Button text={t('button.confirm')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginTop: 24,
    margin: layout.margin,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: fonts.Medium,
    fontSize: 22,
    color: colors.darkBlue,
  },
  subtitle: {
    fontFamily: fonts.REGULAR,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color: colors.darkGray,
  },
  countrySelectionTitle: {
    fontFamily: fonts.Medium,
    fontSize: 17,
  },
});

export default RegistrationScreen;
