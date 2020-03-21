import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as actionTypes from '../store/actionTypes';
import TemperatureView from './TemperatureView';

const TemperatureModal = props => {
  const closeModal = () => {
    props.temperatureModalShown(false);
  };
  const confirmTemperature = degree => {
    closeModal();
  };
  return (
    <Modal
      isVisible={props.showTemperature}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={closeModal}>
      <TemperatureView onTemperatureConfirm={confirmTemperature} />
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  // Redux Store --> Component
  return {
    showTemperature: state.home.showTemperature,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    temperatureModalShown: shown =>
      dispatch({
        type: actionTypes.TEMPERATURE_MODAL_SHOWN,
        value: shown,
      }),
    sendTemperature: temperature =>
      dispatch({
        type: actionTypes.SEND_TEMPERATURE,
        value: temperature,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureModal);
