import React, {useEffect, Fragment, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import HomeScreenHeader from '../../components/HomeScreenHeader';
import HomeScreenBody from '../../components/HomeScreenBody';
import HealthSurveyModal from '../../components/HealthSurveyModal';
import TemperatureModal from '../../components/Temperature/TemperatureModal';
import PossibleInfectionsModal from '../../components/PossibleInfectionsModal';
import {connect} from 'react-redux';
import {CardSection} from './remainingDays';
import {useTranslation} from 'react-i18next';
import Spacer from '../../components/Spacer';
import actions  from '../../store/action';
import * as statusActions from './healthStatus/actions'
import {isnull} from '../../utils/validation';
import Screens from '../../navigators/Screens'

const HomeScreen = ({fetchRemainingDays, quarantine,questions ,questionsReady, answerQuestion, navigation, fetchStatusCategories}) => {
  const {t} = useTranslation();
  useEffect(() => {
    fetchStatusCategories();
    fetchRemainingDays()
  }, [])

  const [tShow, setTShow] = useState(false)
  const [hShow, setHShow] = useState(false)

  useEffect(() => {
    if(questionsReady) {
      navigation.navigate(Screens.Questions,questions)
    }
  }, [questionsReady])


  const RemainingDaysFragment = () => {
    if (isnull(quarantine) || !quarantine.isQuarantine) {
      return <Fragment/>
    }
  
    return (
      <CardSection
        maxVal={14}
        currVal={quarantine.days}
        title={t('remainingDays.title')}
        message={t('remainingDays.desc')}
        subtitle={t('remainingDays.subtitle')}
      />
    );
  };

  const onTemperatureConfirm = temperature => {
    setTShow(false)
  }
  const onSelectOptions = () =>{
    setHShow(false)
  }
  const onTModalHide = ()=> {
    answerQuestion()
  }
  return (
    <View style={styles.container}>
      <HomeScreenHeader />
      {/* <Spacer space={90} /> */}
      <RemainingDaysFragment />
      <HomeScreenBody />
      {/* <TemperatureModal show={false} onTemperatureConfirm={onTemperatureConfirm} onModalHide={onTModalHide}/> */}
      {/* <HealthSurveyModal show={false} onSelectOptions= {onSelectOptions} onModalHide={onTModalHide}/> */}
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
});

const mapStateToProps = state => {
  return {
    quarantine: state.home.quarantine,
    questions: state.status.questions,
    currentQuestionIndex: state.status.currentQuestionIndex,
    questionsReady: state.status.questionsReady
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStatusCategories: () =>
      dispatch(statusActions.fetchStatusCategories()),
    fetchRemainingDays: ()=> dispatch(actions.fetchRemainingDays()),
    answerQuestion: ()=> dispatch(statusActions.questionAnswered())
  };
};

export default connect(mapStateToProps,mapDispatchToProps )(HomeScreen);
