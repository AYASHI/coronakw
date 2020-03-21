import React, {Component} from 'react';
import {I18nManager} from 'react-native';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import fonts from '../utils/fonts';
import colors from '../utils/colors';

export default class TextField extends Component {
  static propTypes = {
    onInputValueChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    isSecureText: PropTypes.bool,
    maxDigits: PropTypes.number,
    keyboard: PropTypes.oneOf([
      'default',
      'email-address',
      'number-pad',
      'numeric',
      'phone-pad',
    ]),
  };

  static defaultProps = {
    isSecureText: false,
    keyboard: 'default',
    maxDigits: 10000,
  };

  onChangeText = value => {
    this.setState({inputValue: value});
    this.props.onInputValueChange(value);
  };

  render() {
    const {rightPadding} = this.props;
    const {isSecureText} = this.props;
    const {title} = this.props;
    const {placeholder} = this.props;

    const fieldFlex = rightPadding == null ? 1 : 0.85;
    return (
      <View style={styles.inputContentView}>
        <Text style={styles.infoText}>{title}</Text>
        <View style={{height: 5}} />
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType={this.props.keyboard}
            style={[
              {flex: fieldFlex},
              styles.inputsTextInput,
              {
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              },
            ]}
            maxLength={this.props.maxDigits}
            placeholder={placeholder}
            placeholderTextColor={colors.paleGreyTwo}
            secureTextEntry={!!isSecureText}
            onChangeText={value => this.onChangeText(value)}
            value={this.props.inputValue}
          />
          {rightPadding}
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  inputContentView: {
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 8,
    marginBottom: 8,
    width: '90%',
  },
  inputsTextInput: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: colors.opacityWhite,
    height: 50,
    color: colors.brownishGrey,
    paddingLeft: 10,
    borderRadius: 4,
    borderColor: colors.paleGreyTwo,
    borderWidth: 1,
    textAlign: 'left',
  },
  infoText: {
    fontFamily: fonts.REGULAR,
    color: colors.opacityBlack,
    marginBottom: 8,
    fontSize: 15,
    opacity: 0.77,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
