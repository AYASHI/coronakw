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
import Screens from '../../navigators/Screens';

const HomeScreen = props => {
  const [load, _] = useState(true);
  useEffect(() => {
    props.checkLocation();
  }, [load]);

  useEffect(() => {
    if (props.shouldUpdateLocation) {
      props.navigation.navigate(Screens.TakeLocation);
    }
  });

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
    shouldUpdateLocation: state.home.shouldUpdateLocation ?? null,
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
