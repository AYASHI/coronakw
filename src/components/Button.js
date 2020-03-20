import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import layout from '../utils/layout';

const Button = props => {
  const disabledStyle = props.disabled
    ? {backgroundColor: colors.greenDisabled}
    : {backgroundColor: colors.green};
  return (
    <TouchableOpacity
      activeOpacity={props.disabled ? 0.2 : 0.7}
      style={[styles.container, disabledStyle]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: layout.margin,
    paddingEnd: layout.margin,
    borderRadius: layout.radius,

    height: 56,
  },
  text: {
    color: 'white',
    fontFamily: fonts.Bold,
    fontSize: 20,
  },
});

export default Button;
