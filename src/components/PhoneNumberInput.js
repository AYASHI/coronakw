import React, {Fragment} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';

const PhoneNumberInput = props => {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.flagContainer}>
          <Text style={styles.flag}>🇰🇼</Text>
        </View>

        <TextInput
          placeholder={props.placeholder}
          style={styles.textInput}
          value={props.value}
          maxLength={8}
          keyboardType={'phone-pad'}
          onChangeText={props.onChangeText}
        />
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: colors.borderColor,
    borderRadius: 6,
    borderWidth: 1,
    height: 48,
    flexDirection: 'row',
  },
  flagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    borderEndWidth: 1,
    borderColor: colors.borderColor,
  },
  flag: {
    fontSize: 22,
  },
  textInput: {
    height: 48,
    paddingStart: 16,
    paddingEnd: 16,
    fontFamily: fonts.Medium,
    fontSize: 16,
    flex: 1,
  },
  textInputTitle: {
    color: '#696969',
  },
});
export default PhoneNumberInput;
