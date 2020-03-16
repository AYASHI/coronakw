import React, {Fragment, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import layout from '../utils/layout';
import StatusSelectionView from './StatusSelectionView';
import { connect } from 'react-redux';
import * as constants from "../utils/constants";

const HomeScreenHeader = props => {

  let containerColor = {
    backgroundColor: colors.status.green,
  }

  if (props.healthState == constants.UNHEALTHY) {
    containerColor.backgroundColor = colors.status.yellow;
  }
  else if (props.healthState == constants.SERIOUSLY_UNHEALTHY) {
    containerColor.backgroundColor = colors.status.red;
  }
  
  const color = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(color, {
      toValue: containerColor.backgroundColor,
      duration: 500
    }).start();
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={[styles.saveArea, containerColor]} />
      <View style={[styles.container, containerColor]}>
        <Text style={styles.lastUpdateText}>اخر تحديث منذ ساعة</Text>
        <Text style={styles.howDoYouFeel}>كيف تشعر الأن؟</Text>
        <StatusSelectionView />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    backgroundColor: colors.status.green,
  },
  container: {
    height: 174,
    width: '100%',
    padding: layout.margin,
    paddingTop: 22,
  },
  lastUpdateText: {
    color: colors.opacityWhite,
    fontFamily: fonts.Semibold,
    fontSize: 15,
    textAlign: 'left',
  },
  howDoYouFeel: {
    fontFamily: fonts.Bold,
    textAlign: 'left',
    color: 'white',
    fontSize: 32,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    healthState: state.home.healthState,
    isSick: state.home.isSick
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenHeader);
