import React, {useState} from 'react';

import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import images from '../utils/images';
import colors from '../utils/colors';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as actionTypes from '../store/actionTypes';
import Button from './Button';
import Spacer from './Spacer';
import {useTranslation} from 'react-i18next';

const PossibleInfectionsModal = props => {
  const {t, i18n} = useTranslation();

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

  const [names, setNames] = useState([]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const closeModal = () => {
    props.possibleInfectionsModalShown(false);
    setNames([]);
  };

  var buttonText;

  if (name == '' || phone == '') {
    if (names.length == 0) {
      buttonText = t('button.close');
    } else {
      buttonText = t('possibleInfectionsModal.send', {count: names.length});
    }
  } else {
    buttonText = t('possibleInfectionsModal.add');
  }

  const pressedButton = () => {
    //is there any text added?  If so, add them to array, clear input and update state.
    if (name == '' || phone == '') {
      closeModal();
      if (names.length > 0) {
        props.sendPossibleInfections(names);
      }
    } else {
      const person = {
        name,
        phone,
      };
      setNames([...names, person]);
      setName('');
      setPhone('');
    }
    //no input?  send data
  };

  return (
    <Modal
      isVisible={props.showPossibleInfections}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={closeModal}>
      <View style={styles.content}>
        <Image source={images.shakeHand} />

        <Text style={styles.contentSubTitle}>
          {t('possibleInfectionsFragment.subtitle')}
        </Text>
        <Text style={styles.contentTitle}>
          {t('possibleInfectionsModal.title')}
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Placeholder for name input from onboarding"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Placeholder for phone input from onboarding"
        />
        <Spacer />
        <Button text={buttonText} onPress={pressedButton} />
      </View>
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log('state', state);
  // Redux Store --> Component
  return {
    showPossibleInfections: state.home.showPossibleInfections,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    possibleInfectionsModalShown: shown =>
      dispatch({
        type: actionTypes.POSSIBLE_INFECTIONS_MODAL_SHOWN,
        value: shown,
      }),
    sendPossibleInfections: possibleInfections =>
      dispatch({
        type: actionTypes.SEND_POSSIBLE_INFECTIONS,
        value: possibleInfections,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PossibleInfectionsModal);
