import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import images from '../../utils/images';
import Spacer from '../Spacer';
import Button from '../Button';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import ActionCreators from '../../store/action';
import {bindActionCreators} from 'redux';

const TemperatureView = props => {
  const {t} = useTranslation();
  const [temperature, setTemperature] = useState('');

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
  const pressedButton = () => {
    props.confirmTemperature(parseFloat(temperature));
    if (props.onTemperatureConfirm) {
      props.onTemperatureConfirm(parseFloat(temperature));
    }
  };
  return (
    <View style={styles.content}>
      <Image source={images.scanner} />

      <Text style={styles.contentSubTitle}>
        {t('temperatureModal.subtitle')}
      </Text>
      <Text style={styles.contentTitle}>{t('temperatureModal.title')}</Text>
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
      <Button
        text={t('temperatureModal.confirmButton')}
        onPress={pressedButton}
      />
    </View>
  );
};

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
    textAlign: 'center',
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      confirmTemperature: ActionCreators.confirmTempreture,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureView);
