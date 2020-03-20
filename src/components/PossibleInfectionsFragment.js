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

const PossibleInfectionsFragment = props => {
  const {t, i18n} = useTranslation();
  const buttonTouched = () => {
    props.possibleInfectionsModalShown(true);
  };

  const PossibleInfectionsView = () => (
    <TouchableOpacity
      style={styles.temperature}
      onPress={buttonTouched}>
      <Image source={images.shakeHand} />
      <Text style={styles.subtitle}>{t('possibleInfectionsFragment.subtitle')}</Text>
    </TouchableOpacity>
  );
  return (
    <Fragment>
      <View style={styles.container}>
        <PossibleInfectionsView />
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
    possibleInfectionsModalShown: shown =>
      dispatch({
        type: actionTypes.POSSIBLE_INFECTIONS_MODAL_SHOWN,
        value: shown,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PossibleInfectionsFragment);
