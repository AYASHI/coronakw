import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TemperatureView from '../../../components/Temperature/TemperatureView';
import { connect } from 'react-redux';
import * as actions from './actions'
import HealthSurveyModal from '../../../components/HealthSurveyModal';
import { ScrollView } from 'react-native-gesture-handler';
const QuestionsScreen = props => {
  const [question, setQuestion] = useState({})

  useEffect(() => {
    if(props.currentQuestionIndex >= 0 && props.currentQuestionIndex < props.questions.length) {
      setQuestion(props.questions[props.currentQuestionIndex])
    } else if (props.currentQuestionIndex === props.questions.length){
      //props.navigation.goBack()
      props.submitAnswers({vitalStatusId: props.vitalStatusId, questions: props.questionsAnswers})
    }
  }, [props.currentQuestionIndex])

  // useEffect(() => {
  //   if(props.submitAnswersSuccess) {
  //     
  //   }
  // }, [props.submitAnswersSuccess])

  const onTemperatureConfirm = (degree) => {
    let answer = {questionId: question.questionId, answerText: degree}
    props.questionAnswered(answer)
  }

  const onSelectOptions = (answerText) => {
    let answer = {questionId: question.questionId, answerText}
    props.questionAnswered(answer)
  }

  return (
    <SafeAreaView style={styles.saveArea}>
      <ScrollView style={styles.container}>
        {question.questionType === 3 && <TemperatureView onTemperatureConfirm={onTemperatureConfirm}/>}
        {question.questionType === 1 && <HealthSurveyModal onSelectOptions={onSelectOptions} question={question} single={false}/>}
        {question.questionType === 2 && <HealthSurveyModal onSelectOptions={onSelectOptions} question={question} single={true}/>}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    vitalStatusId: state.status.vitalStatusId,
    questions: state.status.questions,
    currentQuestionIndex: state.status.currentQuestionIndex,
    questionsAnswers: state.status.questionsAnswers,
    submitAnswersSuccess: state.status.submitAnswersSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionAnswered: (answer)=> dispatch(actions.questionAnswered(answer)), 
    submitAnswers: (payload)=> dispatch(actions.submitAnswers(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (QuestionsScreen);

const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
