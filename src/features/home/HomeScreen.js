import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import HomeScreenBody from '../../components/HomeScreenBody';
import HealthSurveyModal from '../../components/HealthSurveyModal';
import TemperatureModal from '../../components/Temperature/TemperatureModal';
import PossibleInfectionsModal from '../../components/PossibleInfectionsModal';
import {bindActionCreators} from 'redux';
import ActionCreators from '../../store/action';
import {connect} from 'react-redux';

const HomeScreen = props => {

  const [load, _] = useState(true)
  useEffect(() => {
    props.checkLocation()
  }, [load]);

  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <HomeScreenBody />
      <HealthSurveyModal />
      <TemperatureModal />
      <PossibleInfectionsModal />
    </View>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    isValid: state.boarding.isRegisterationSuccess ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      checkLocation: ActionCreators.checkLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
