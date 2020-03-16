import React, {useState} from 'react';

import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import images from '../utils/images';
import colors from '../utils/colors';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as actionTypes from '../store/actionTypes';
import Button from './Button';
import Spacer from './Spacer';

const TemperatureModal = props => {
  const styles = StyleSheet.create({
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      color: '#616161',
      fontSize: 15,
      marginBottom: 12,
    },
    contentSubTitle: {
      fontSize: 28,
      marginBottom: 12,
    },
    textInput: {
      // Setting up Hint Align center.
      textAlign: 'center',

      // Setting up TextInput height as 50 pixel.
      height: 122,
      width: 194,
      fontSize: 72,

      // Set border Radius.
      borderRadius: 20,

      //Set background color of Text Input.
      backgroundColor: colors.paleGrey,
    },
  });

  const [temperature, setTemperature] = useState('');

  const closeModal = () => {
    props.temperatureModalShown(false);
  };

  const pressedButton = () => {
    closeModal();
    props.sendTemperature(parseFloat(temperature));
  };

  const prettyDecimal = value => {
    let temp = parseFloat(value);
    if (isNaN(temp)) {
      return '';
    }

    //we use string from here on
    temp = temp.toString();

    if (temp.length === 2) {
      return temp + '.';
    }
    // else if (temp.length == 4)
    return temp;
  };

  return (
    <Modal
      isVisible={props.showTemperature}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={closeModal}>
      <View style={styles.content}>
        <Image source={images.scanner} />

        <Text style={styles.contentSubTitle}>قياس درجة الحرارة الدورية</Text>
        <Text style={styles.contentTitle}>
          قم بإدخال درجة حراراتك الحالية، حرصاً على سلامتك..
        </Text>
        <TextInput
          placeholder="0.0"
          value={temperature}
          onChangeText={value => {
            if (temperature === -1) {
              return setTemperature('');
            }
            if (value.toString().length < 4) {
              return setTemperature(prettyDecimal(value));
            }
            return setTemperature(value);
          }}
          underlineColorAndroid="transparent"
          maxLength={4}
          onKeyPress={({nativeEvent}) => {
            console.log(nativeEvent);
            if (nativeEvent.key === 'Backspace') {
              setTemperature(-1);
            }
          }}
          keyboardType="decimal-pad"
          autoFocus={true}
          style={styles.textInput}
        />
        <Spacer />
        <Button text={'تأكيد درجة الحرارة الحالية'} onPress={pressedButton} />
      </View>
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  // Redux Store --> Component
  return {
    showTemperature: state.home.showTemperature,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    temperatureModalShown: shown =>
      dispatch({
        type: actionTypes.TEMPERATURE_MODAL_SHOWN,
        value: shown,
      }),
    sendTemperature: temperature =>
      dispatch({
        type: actionTypes.SEND_TEMPERATURE,
        value: temperature,
      }),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TemperatureModal);
