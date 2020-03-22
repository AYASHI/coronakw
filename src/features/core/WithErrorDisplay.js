import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import React from 'react';
import * as actionTypes from '../../store/actionTypes';

const withErrorDisplay = Comp => props => {
  if (props.isError) {
    Alert.alert(
      'Ops!!',
      props.errorMessage,
      [
        {
          text: 'Ok',
          onPress: () => {
            props.hideError();
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  return (
    <View style={{flex: 1}}>
      <Comp {...props} />
    </View>
  );
};

const mapErrorStateToProps1 = state => {
  return {
    isError: state.core.isError ?? null,
    errorMessage: state.core.errorMessage,
  };
};

const mapDispatchToProps1 = dispatch => {
  return {
    hideError: () =>
      dispatch({
        type: actionTypes.HIDE_ERROR,
      }),
  };
};

const WithErrorDisplay = component => {
  return connect(
    mapErrorStateToProps1,
    mapDispatchToProps1,
  )(withErrorDisplay(component));
};

export default WithErrorDisplay;
