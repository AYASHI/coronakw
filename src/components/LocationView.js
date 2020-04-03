import React from 'react';
import {
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  Text,
  PermissionsAndroid,
} from 'react-native';
import images from '../utils/images';
import {useTranslation} from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import ActionCreators from '../store/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const LocationView = props => {
  const {t} = useTranslation();
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
      props.showError(
        'Permission is denied to fetch location, please enable it.',
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Location permission revoked by user.');
      props.showError(
        'Permission is denied to fetch location, please enable it.',
      );
    }

    return false;
  };

  const gpsButtonPressed = async () => {
    props.getDeviceLocation();
    return;
    const canLocate = await hasLocationPermission();

    if (!canLocate) {
      return;
    }

    props.startRequest();
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        let location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        props.onLocationSelected(location);
        props.setRequestAsSuccess();
      },
      error => {
        //TODO: notify user?
        console.log(error);
        props.setRequestAsFailed(error.message);
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

  const backgroundColor = props.color || 'white';
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={gpsButtonPressed}>
      <Image source={images.location} />
      <Text>{t('currentPosition.gpsButton')}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      startRequest: ActionCreators.startRequest,
      setRequestAsFailed: ActionCreators.setRequestAsFailed,
      setRequestAsSuccess: ActionCreators.setRequestAsSuccess,
      getDeviceLocation: ActionCreators.getDeviceLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationView);
