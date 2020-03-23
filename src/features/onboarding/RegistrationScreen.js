import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import images from '../../utils/images';
import {useTranslation} from 'react-i18next';
import CustomTextInput from '../../components/CustomTextInput';
import Spacer from '../../components/Spacer';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import YesNoQuestion from '../../components/YesNoQuestion';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import Screens from '../../navigators/Screens';
import {countries} from '../../utils/mockData';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionCreators from '../../store/action';
import styles from './styles';

const RegistrationScreen = props => {
  const {t} = useTranslation();
  const [civilID, setCivilID] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [didTravel, setDidTravel] = useState(false);
  const [visitedCountries, setCountriesVisited] = useState([])

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
        <DropDown
          placeholder={t('placeholder.selectCountries')}
          data={countries}
        />
      </Fragment>
    );
  };

  const confirm = () => {
    props.register(civilID, fullName, phoneNumber, didTravel, visitedCountries)
  };

  useEffect(() => {
    if(props.isRegistered) {
      props.navigation.navigate(Screens.TakeTemperature);
    }
  })

  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView style={styles.container}>
        <HeaderFragment />
        <CustomTextInput
          title={t('onboarding.civilId')}
          value={civilID}
          number={true}
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
        <YesNoQuestion onQuestionSelected={index => {setDidTravel(index == 0)}} />
        <Spacer space={32} />
        <CountrySelectionFragment />
        <Spacer space={32} />
        <Button text={t('button.confirm')} onPress={confirm} />
      </ScrollView>
    </SafeAreaView>
  );
};


const mapStateToProps = state => {
  return {
    isRegistered: state.boarding.isSuccess ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      register: ActionCreators.registerUser,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationScreen);
