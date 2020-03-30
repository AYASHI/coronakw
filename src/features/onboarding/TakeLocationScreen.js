import React, {useEffect, useState} from 'react';
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
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';

const TakeLocationScreen = ({navigation, sendLocation, isSuccess}) => {
  const {t} = useTranslation();

  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [block, setblock] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const confirm = () => {
    sendLocation(
      location.latitude,
      location.longitude,
      area.id,
      street,
      block,
      phone,
    );
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(Screens.Home);
    }
  });

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
  const onLocationSelected = location => {
    setLocation(location);
  };

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
          <DropDown
            placeholder={t('placeholder.area')}
            data={areas}
            changedAnswer={setArea}
          />
          <DropDown
            placeholder={t('placeholder.city')}
            data={areas}
            changedAnswer={setArea}
          />
          <Spacer />
          <CustomTextInput
            title={t('placeholder.street')}
            onChangeText={setStreet}
          />
          <Spacer />
          <CustomTextInput
            title={t('placeholder.block')}
            onChangeText={setblock}
          />
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

const mapStateToProps = state => {
  return {
    isSuccess: state.boarding.locationSent ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      sendLocation: ActionCreators.sendLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakeLocationScreen);
