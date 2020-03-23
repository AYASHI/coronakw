import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Screens from '../../navigators/Screens';
import TemperatureView from '../../components/TemperatureView';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionCreators from '../../store/action';

const TakeTemperatureScreen = ({navigation, confirmTemperature, isSuccess}) => {
  const confirmTemperaturePressed = degree => {
    confirmTemperature(degree)
  };
  
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(Screens.TakeLocation);
    }
  })

  return (
    <SafeAreaView style={styles.saveArea}>
      <TemperatureView onTemperatureConfirm={confirmTemperaturePressed} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    isSuccess: state.boarding.temperatureRecorded ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      confirmTemperature: ActionCreators.confirmTempreture,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakeTemperatureScreen);
