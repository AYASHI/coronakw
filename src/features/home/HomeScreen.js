import React, {useEffect, Fragment, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import HomeScreenBody from '../../components/HomeScreenBody';
import PossibleInfectionsModal from '../../components/PossibleInfectionsModal';
import {connect} from 'react-redux';
import {RemainingDaysSection} from './remainingDays';
import {useTranslation} from 'react-i18next';
import Spacer from '../../components/Spacer';
import ActionsCreators from '../../store/action';
import * as statusActions from './healthStatus/actions';
import {isnull} from '../../utils/validation';
import {bindActionCreators} from 'redux';
import Screens from '../../navigators/Screens';

const HomeScreen = ({
  shouldUpdateLocation,
  checkLocation,
  fetchRemainingDays,
  quarantine,
  questions,
  questionsReady,
  navigation,
  fetchStatusCategories,
  locationUpdated
}) => {
  const {t} = useTranslation();
  useEffect(() => {
    if (shouldUpdateLocation) {
      navigation.navigate(Screens.TakeLocation);
    } else if (!isnull(shouldUpdateLocation)){
      fetchStatusCategories();
      fetchRemainingDays()
    }
  }, [shouldUpdateLocation]);


  useEffect(() => {
    checkLocation();
  }, []);

  useEffect(() => {
    // called after user update their location
    if (locationUpdated) {
      fetchStatusCategories();
      fetchRemainingDays()
    }
  }, [locationUpdated])
  useEffect(() => {
    if (questionsReady) {
      navigation.navigate(Screens.Questions, questions);
    }
  }, [questionsReady]);

  showQuarantineMessage = () => {
    return !(isnull(quarantine) || !quarantine.isQuarantine);
  };

  const RemainingDaysFragment = () => {
    if (!showQuarantineMessage()) {
      return <Fragment />;
    }

    return (
      <RemainingDaysSection
        maxVal={14}
        currVal={quarantine.days}
        style={styles.RemainingDaysSection}
        title={t('remainingDays.title')}
        message={t('remainingDays.desc')}
        subtitle={t('remainingDays.subtitle')}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      {showQuarantineMessage() && (
        <View>
          <Spacer space={80} />
          <RemainingDaysFragment />
        </View>
      )}
      <HomeScreenBody />
      <PossibleInfectionsModal />
    </View>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  RemainingDaysSection: {
    margin: 20,
  },
});

const mapStateToProps = state => {
  return {
    quarantine: state.home.quarantine,
    questions: state.status.questions,
    currentQuestionIndex: state.status.currentQuestionIndex,
    questionsReady: state.status.questionsReady,
    shouldUpdateLocation: state.home.shouldUpdateLocation ?? null,
    locationUpdated: state.boarding.locationSent ?? null,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchStatusCategories: statusActions.fetchStatusCategories,
      fetchRemainingDays: ActionsCreators.fetchRemainingDays,
      checkLocation: ActionsCreators.checkLocation,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
