import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import layout from '../utils/layout';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actionTypes';

import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../utils/images';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {useTranslation} from 'react-i18next';

const EnterTemperatureFragment = props => {
  const {t, i18n} = useTranslation();
  const temperatureButtonTouched = () => {
    props.temperatureModalShown(true);
  };

  const TemperatureView = () => (
    <TouchableOpacity
      style={styles.temperature}
      onPress={temperatureButtonTouched}>
      <Image source={images.temperature} />
      <Text style={styles.subtitle}>{t('enterTemperatureFragment.subtitle')}</Text>
    </TouchableOpacity>
  );
  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.title}>{t("enterTemperatureFragment.title")}</Text>
        <TemperatureView />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  temperature: {
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  container: {
    width: '100%',
    padding: layout.margin,
  },

  title: {
    color: colors.gray,
    fontSize: 17,
    textAlign: 'left',
    padding: 5,
  },
  subtitle: {
    fontFamily: fonts.Medium,
    textAlign: 'left',
    fontSize: 17,
    marginStart: 10,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {};
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    temperatureModalShown: isShown =>
      dispatch({
        type: actionTypes.TEMPERATURE_MODAL_SHOWN,
        value: isShown,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnterTemperatureFragment);
