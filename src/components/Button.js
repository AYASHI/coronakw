import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import layout from '../utils/layout';

const Button = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
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
    backgroundColor: colors.green,
    height: 56,
  },
  text: {
    color: 'white',
    fontFamily: fonts.Bold,
    fontSize: 20,
  },
});

export default Button;
