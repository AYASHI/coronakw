import React, {Fragment} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
const CustomTextInput = props => {
  return (
    <Fragment>
      <Text style={styles.textInputTitle}> {props.title}</Text>
      <TextInput
        style={styles.textInput}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.number ? 'phone-pad' : 'default'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: colors.borderColor,
    borderRadius: 6,
    borderWidth: 1,
    height: 48,
    paddingStart: 16,
    paddingEnd: 16,
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  textInputTitle: {
    color: '#696969',
  },
});

export default CustomTextInput;
