import React from 'react';
import {View} from 'react-native';
import layout from '../utils/layout';

const Spacer = props => {
  return <View style={{height: props.space ? props.space : layout.margin}} />;
};

export default Spacer;
