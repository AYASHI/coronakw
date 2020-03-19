import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import layout from '../utils/layout';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actionTypes';

import Geolocation from 'react-native-geolocation-service';
import fonts from '../utils/fonts';
import colors from '../utils/colors';
import images from '../utils/images';
import {useTranslation} from 'react-i18next';
const CurrentPositionFragment = props => {
  const {t, i18n} = useTranslation();

  const hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    //TODO: What do we want to do here?
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Location permission revoked by user.');
    }

    return false;
  };

  const gpsButtonPressed = async () => {
    const canLocate = await hasLocationPermission();

    if (!canLocate) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        let location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        props.sendLocation(location);
      },
      error => {
        //TODO: notify user?
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };
  const LocationView = () => (
    <TouchableOpacity style={styles.location}>
      <Image source={images.location} />
      <Button
        title={t('currentPosition.gpsButton')}
        onPress={gpsButtonPressed}
      />
    </TouchableOpacity>
  );
  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>{t('currentPosition.title')}</Text>
        <Text style={styles.subtitle}>{t('currentPosition.subtitle')}</Text>
        <LocationView />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  location: {
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 5,
  },
  container: {
    width: '100%',
    padding: layout.margin,
  },
  subtitle: {
    fontFamily: fonts.REGULAR,
    color: colors.gray,
    fontSize: 17,
    textAlign: 'left',
    padding: 5,
  },
  title: {
    fontFamily: fonts.REGULAR,
    textAlign: 'left',
    fontSize: 20,
    padding: 5,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {};
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    sendLocation: location =>
      dispatch({
        type: actionTypes.SEND_LOCATION,
        value: location,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentPositionFragment);
