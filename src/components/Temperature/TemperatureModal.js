import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import TemperatureView from './TemperatureView';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';

const TemperatureModal = props => {
  const closeModal = () => {
    props.temperatureModalShown(false);
  };

  useEffect(() => {
    if (props.isSuccess) {
      closeModal();
      setTimeout(() => props.resetTemperatureRequestState(), 1000)
    }
  });

  return (
    <Modal
      style={{zIndex: 10}}
      isVisible={props.showTemperature}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={closeModal}>
      <TemperatureView />
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  // Redux Store --> Component
  return {
    isSuccess: state.boarding.temperatureRecorded ?? null,
    showTemperature: state.home.showTemperature,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return bindActionCreators(
    {
      temperatureModalShown: ActionCreators.temperatureModalShown,
      sendTemperature: ActionCreators.confirmTempreture,
      resetTemperatureRequestState: ActionCreators.resetTemperatureRequestState
    },
    dispatch,
  );
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureModal);
