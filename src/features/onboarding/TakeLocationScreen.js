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
import {areas, cities, accomodationTypes} from '../../utils/mockData';
import Spacer from '../../components/Spacer';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';
import {isnull} from '../../utils/validation';

const TakeLocationScreen = ({navigation, sendLocation, isSuccess}) => {
  const {t} = useTranslation();

  const [location, setLocation] = useState('');
  const [block, setblock] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState({});
  const [cityTitle, setCityTitle] = useState(null);
  const [accomdation, setAccomodation] = useState({
    id: 0,
    text: t('placeholder.accomodationType'),
  });
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState(0);
  const [building, setBuilding] = useState(0);
  const [houseBuilding, setHouseBuilding] = useState(0);
  const [avenue, setAvenue] = useState('');

  const confirm = () => {
    sendLocation(
      location.latitude ?? '29', // within kuwait
      location.longitude ?? '48', // withing kuwait
      area.id,
      street,
      block,
      city.id,
      avenue,
      accomdation.id,
      building,
      houseBuilding,
      floor,
      apartment,
    );
  };

  useEffect(() => {
    setCityTitle(city.text);
  }, [city]);

  useEffect(() => {
    if (isSuccess) {
      console.log('horray update location is syccess lets go home');
      navigation.navigate(Screens.Home);
    }
  }, [isSuccess]);

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
            placeholder={cityTitle ?? t('placeholder.city')}
            data={cities}
            changedAnswer={setCity}
          />

          {cityTitle && (
            <DropDown
              placeholder={
                (isnull(area) ? null : area.text) ?? t('placeholder.area')
              }
              data={areas(city.id)}
              changedAnswer={setArea}
            />
          )}

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

          <CustomTextInput
            title={t('placeholder.avenue')}
            onChangeText={setAvenue}
          />
          <Spacer />

          <DropDown
            placeholder={accomdation.text}
            data={accomodationTypes}
            changedAnswer={setAccomodation}
          />

          <Spacer />

          {accomdation.id === 1 && (
            <View>
              <CustomTextInput
                title={t('placeholder.housebuildingNumber')}
                onChangeText={setHouseBuilding}
              />

              <Spacer />
            </View>
          )}

          {accomdation.id === 0 && (
            <View>
              <CustomTextInput
                title={t('placeholder.buildingNumber')}
                onChangeText={setBuilding}
              />
              <Spacer />

              <CustomTextInput
                title={t('placeholder.floor')}
                onChangeText={setFloor}
              />
              <Spacer />

              <CustomTextInput
                title={t('placeholder.apartment')}
                onChangeText={setApartment}
              />
              <Spacer />
            </View>
          )}

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
