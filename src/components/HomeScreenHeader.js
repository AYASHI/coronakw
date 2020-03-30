import React, {Fragment, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import layout from '../utils/layout';
import StatusSelectionView from './StatusSelectionView';
import {connect} from 'react-redux';
import * as constants from '../utils/constants';
import {useTranslation} from 'react-i18next';
import * as statusActions from '../features/home/healthStatus/actions'
const HomeScreenHeader = props => {
  const {t, i18n} = useTranslation();

  useEffect(() => {
    props.fetchStatusCategories()
  }, [])

  let containerColor = {
    backgroundColor: colors.status.green,
  };

  if (props.healthState == constants.UNHEALTHY) {
    containerColor.backgroundColor = colors.status.yellow;
  } else if (props.healthState == constants.SERIOUSLY_UNHEALTHY) {
    containerColor.backgroundColor = colors.status.red;
  }

  return (
    <Fragment>
      <SafeAreaView style={[styles.saveArea, containerColor]} />
      <View style={[styles.container, containerColor]}>
        <Text style={styles.lastUpdateText}>{t('home.lastUpdateText')}</Text>
        <Text style={styles.howDoYouFeel}>{t('home.howDoYouFeel')}</Text>
        <StatusSelectionView categories={props.statusCategories}/>
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
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    healthState: state.home.healthState,
    isSick: state.home.isSick,
    statusCategories: state.status.statusCategories
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    fetchStatusCategories: ()=> dispatch(statusActions.fetchStatusCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenHeader);
