import React, {useEffect} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import images from '../utils/images';
import {useTranslation} from 'react-i18next';
import ActionCreators from '../store/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isnull} from '../utils/validation';

const LocationView = ({
  isLocationGranted,
  getDeviceLocation,
  color,
  showError,
}) => {
  const {t} = useTranslation();

  const gpsButtonPressed = async () => {
    getDeviceLocation();
  };

  useEffect(() => {
    if (!isnull(isLocationGranted) && !isLocationGranted) {
      console.log('lets show an error about location');
      showError(t('common.cantFetchLocation'));
    }
  }, [isLocationGranted]);

  const backgroundColor = color || 'white';
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
  return {
    isLocationGranted: state.home.isLocationGranted ?? null,
  };
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
