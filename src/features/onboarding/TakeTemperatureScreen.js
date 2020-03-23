import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Screens from '../../navigators/Screens';
import TemperatureView from '../../components/TemperatureView';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionCreators from '../../store/action';

const TakeTemperatureScreen = ({navigation}) => {
  const confirmTemperature = degree => {
    navigation.navigate(Screens.TakeLocation);
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <TemperatureView onTemperatureConfirm={confirmTemperature} />
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
    isRegistered: state.auth.isRegistered ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      validateCivilId: ActionCreators.validateCivilId,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakeTemperatureScreen);
