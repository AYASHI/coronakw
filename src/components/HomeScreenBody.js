import React, {Fragment} from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {SafeAreaView, View} from 'react-native-safe-area-context';
import layout from '../utils/layout';
import {connect} from 'react-redux';
import PossibleInfectionsFragment from './PossibleInfectionsFragment';
import {useTranslation} from 'react-i18next';
import WhatToDoNext from '../features/home/WhatToDoNext';
const HomeScreenBody = props => {
  const {t} = useTranslation();
  const patientVitalStatusColor = props.patientVitalStatusColor ?? "green"
  return (
    <Fragment>
        <WhatToDoNext status={patientVitalStatusColor.toLowerCase() !== 'green' ? 3 : 1}/>
        <Text style={styles.title}>{t('home.howCanWeHelp')}</Text>
        <PossibleInfectionsFragment />
     </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: layout.margin,
    paddingTop: 8,
  },
  scrollView: {
    // paddingVertical: 90   //I couldn't get the text to fall behind the StatusSelectionView.  zIndex didn't do much and there's no time to mess around with it.
  },
  subtitle: {
    color: colors.paleGrey,
    fontFamily: fonts.Semibold,
    fontSize: 15,
    textAlign: 'left',
  },
  title: {
    color: colors.gray,
    fontSize: 17,
    textAlign: 'left',
    padding: 5,
    marginStart: layout.margin,
    marginTop: 12,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    healthState: state.home.healthState || 1,
    isSick: state.home.isSick,
    patientVitalStatusColor: state.home.patientVitalStatusColor
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenBody);
