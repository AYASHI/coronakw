import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import TemperatureView from './TemperatureView';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';
import LoadingHUD from '../../components/LoadingHud';

const TemperatureModal = props => {
  const closeModal = () => {
    props.temperatureModalShown(false);
  };

  useEffect(() => {
    if (props.isSuccess) {
      closeModal();
      setTimeout(() => props.resetTemperatureRequestState(), 100);
    }
  });

  return (
    <Modal
      style={{zIndex: 1}}
      isVisible={props.show}
      avoidKeyboard={true}
      onModalHide={props.onModalHide}
      swipeDirection="down"
     onSwipeComplete={closeModal}
      >
      <TemperatureView onTemperatureConfirm={props.onTemperatureConfirm}/>
      {props.isLoading && <LoadingHUD isLoading={props.isLoading} />}
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    isSuccess: state.boarding.temperatureRecorded ?? null,
    //showTemperature: state.home.showTemperature,
    isLoading: state.core.isLoading ?? null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return bindActionCreators(
    {
      temperatureModalShown: ActionCreators.temperatureModalShown,
      sendTemperature: ActionCreators.confirmTempreture,
      resetTemperatureRequestState: ActionCreators.resetTemperatureRequestState,
    },
    dispatch,
  );
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureModal);
