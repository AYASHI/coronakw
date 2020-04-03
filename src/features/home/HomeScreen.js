import React, {useEffect, Fragment} from 'react';
import {View, StyleSheet, Platform, Linking} from 'react-native';
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
import ChatView from '../../components/ChatView';
import * as NavigationService from '../../navigators/NavigationService';
const HomeScreen = ({
  shouldUpdateLocation,
  checkLocation,
  fetchRemainingDays,
  quarantine,
  questions,
  questionsReady,
  navigation,
  fetchStatusCategories,
  patientVitalStatusColor,
  chatRoomUrl,
  locationUpdated,
  getLocationSent,
  isQuarantine,
}) => {
  const {t} = useTranslation();

  // 1 get user current status
  useEffect(() => {
    checkLocation();
  }, []);

  useEffect(() => {
    // 2 if he is home quarantine and need to set location
    if (shouldUpdateLocation) {
      navigation.navigate(Screens.TakeLocation);
    }
  }, [shouldUpdateLocation]);

  useEffect(() => {
    if (getLocationSent) {
      fetchStatusCategories();
      // Getting remaining days only if the user isQuarantine
      if (isQuarantine) fetchRemainingDays();
    }
  }, [getLocationSent]);

  useEffect(() => {
    // called after user update their location
    if (locationUpdated) {
      fetchStatusCategories();
      checkLocation();
    }
  }, [locationUpdated]);

  useEffect(() => {
    if (questionsReady) {
      //navigation.navigate(Screens.Questions, questions);
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
  const startChat = () => {
    if (Platform.OS === 'ios') {
      const canOpen = Linking.canOpenURL(chatRoomUrl);
      if (canOpen) {
        Linking.openURL(chatRoomUrl);
      }
    } else {
      NavigationService.navigate(Screens.LiveChat, chatRoomUrl);
    }
  };
  const shouldStartChat = () => {
    return patientVitalStatusColor !== 'green' && !isnull(chatRoomUrl);
  };
  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      <Spacer space={80} />
      {showQuarantineMessage() && (
        <View>
          <RemainingDaysFragment />
        </View>
      )}
      <HomeScreenBody />
      <PossibleInfectionsModal />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {shouldStartChat() && <ChatView onPress={startChat} />}
      </View>
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
    patientVitalStatusColor: state.home.patientVitalStatus,
    chatRoomUrl: state.home.chatRoomUrl,
    locationUpdated: state.boarding.locationSent ?? null,
    getLocationSent: state.home.getLocationSent, // this value become true after getLocation api called
    isQuarantine: state.home.isQuarantine,
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
