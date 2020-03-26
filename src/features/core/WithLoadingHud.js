import {connect} from 'react-redux';
import React from 'react';
import LoadingHUD from '../../components/LoadingHud';
import {View} from 'react-native';

const withLoadingHud = Comp => props => {
  return (
    <View style={{flex: 1}}>
      <Comp {...props}>{props.children}</Comp>
      {props.isLoading && <LoadingHUD isLoading={props.isLoading} />}
    </View>
  );
};

const mapErrorStateToProps1 = state => {
  return {
    isLoading: state.core.isLoading ?? null,
  };
};

const mapDispatchToProps1 = dispatch => {
  return {};
};

const WithLoadingHud = component => {
  return connect(
    mapErrorStateToProps1,
    mapDispatchToProps1,
  )(withLoadingHud(component));
};

export default WithLoadingHud;
