import React, {Fragment, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import layout from '../utils/layout';
import StatusSelectionView from './CurrentPositionFragment';
import {connect} from 'react-redux';
import * as constants from '../utils/constants';
import CurrentPositionFragment from './CurrentPositionFragment';
import EnterTemperatureFragment from './EnterTemperatureFragment';

const HomeScreenBody = props => {
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CurrentPositionFragment />
          <EnterTemperatureFragment />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: layout.margin,
    paddingTop: 90,
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
    // fontFamily: fonts.Bold,
    textAlign: 'left',
    // color: 'white',
    fontSize: 20,
    padding: 20,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    healthState: state.home.healthState,
    isSick: state.home.isSick,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenBody);
