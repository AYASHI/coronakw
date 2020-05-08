import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Screens from '../../navigators/Screens';
import TemperatureView from '../../components/Temperature/TemperatureView';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActionCreators from '../../store/action';

const TakeTemperatureScreen = ({
  navigation,
  isSuccess,
  resetTemperatureRequestState,
}) => {
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(Screens.TakeLocation);
      setTimeout(() => resetTemperatureRequestState(true), 500);
    }
  });

  return (
    <SafeAreaView style={styles.saveArea}>
      <TemperatureView />
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
  // to prevent this component from receing isSuccess state
  if (state.boarding.shownFromOnBoarding) {
    return {
      isSuccess: null,
    };
  }
  return {
    isSuccess: state.boarding.temperatureRecorded ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      resetTemperatureRequestState: ActionCreators.resetTemperatureRequestState,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakeTemperatureScreen);
