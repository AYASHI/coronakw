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
import CustomTextInput from './CustomTextInput';
import PhoneNumberInput from './PhoneNumberInput';
import {bindActionCreators} from 'redux';
import ActionCreators from '../store/action';
import {
  validateAll,
  validate,
  isNotValidMobileNumber,
  isnull,
  phoneNumberValidation,
  nameValidation,
} from '../utils/validation';

const PossibleInfectionsModal = props => {
  const {t, i18n} = useTranslation();

  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      color: '#616161',
      fontSize: 15,
      marginBottom: 12,
      textAlign: 'center',
    },
    contentSubTitle: {
      fontSize: 28,
      marginBottom: 12,
      textAlign: 'center',
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

  if (isnull(name) && isnull(phone)) {
    buttonText = t('button.close');
  } else {
    buttonText = t('possibleInfectionsModal.send');
  }

  const pressedButton = () => {
    //is there any text added?  If so, add them to array, clear input and update state.

    if (isnull(name) && isnull(phone)) {
      closeModal();
      return;
    }

    const validations = [
      phoneNumberValidation(phone, t('validation.phonenumber')),
      nameValidation(name, t('validation.name')),
    ];
    const validationResult = validateAll(validations);

    if (validationResult.valid) {
      closeModal();
      const person = {
        name,
        phone,
      };
      props.addPatientAssociate(person);
      setName('');
      setPhone('');
    } else {
      props.showError(validationResult.message);
    }
  };

  return (
    <Modal
      isVisible={props.showPossibleInfections}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={images.shakeHand} />

          <Text style={styles.contentSubTitle}>
            {t('possibleInfectionsFragment.subtitle')}
          </Text>
          <Text style={styles.contentTitle}>
            {t('possibleInfectionsModal.title')}
          </Text>
        </View>

        <CustomTextInput
          title={t('placeholder.name')}
          value={name}
          onChangeText={setName}
        />
        <Spacer />
        <PhoneNumberInput
          placeholder={t('placeholder.phoneNumber')}
          value={phone}
          onChangeText={setPhone}
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
  return bindActionCreators(
    {
      showError: ActionCreators.showError,
      addPatientAssociate: ActionCreators.addPatientAssociate,
      possibleInfectionsModalShown: ActionCreators.possibleInfectionsModalShown,
    },
    dispatch,
  );
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PossibleInfectionsModal);
