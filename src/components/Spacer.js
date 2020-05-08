import React from 'react';
import {View} from 'react-native';
import layout from '../utils/layout';

const Spacer = props => {
  const space = props.space ? props.space : layout.margin;
  const style = props.horizontal ? {width: space} : {height: space};
  return <View style={style} />;
};

export default Spacer;
