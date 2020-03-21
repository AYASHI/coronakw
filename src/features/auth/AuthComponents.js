import React, {Fragment, useState} from 'react';
import TextField from '../../components/TextField';
import images from '../../utils/images';
import Button from '../../components/Button';
import styles from './styles';
import {View, Image, Text, KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const LogoFragment = () => {
  return (
    <Fragment>
      <Image style={styles.logo} source={images.logo} />
    </Fragment>
  );
};

export const TitleFragment = ({title}) => {
  return <Text style={styles.instructionText}>{title}</Text>;
};

export const InstructionFragment = ({title}) => {
  return <Text style={styles.infoText}>{title}</Text>;
};

export const SubmitButtonFragment = ({title, action}) => {
  return (
    <View style={{width: '90%'}}>
      <Button text={title} onPress={action} />
    </View>
  );
};

export const InputFragment = ({
  onChange,
  title,
  placeholder,
  maxDigits = 1000,
}) => {
  return (
    <TextField
      maxDigits={maxDigits}
      title={title}
      keyboard="numeric"
      placeholder={placeholder}
      onInputValueChange={onChange}
    />
  );
};

export const AuthContainer = props => {
  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignContent: 'stretch',
        }}
        behavior="position"
        enabled
        keyboardVerticalOffset={60}>
        {props.children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
