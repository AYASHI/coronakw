import React from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import images from '../utils/images';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as actionTypes from '../store/actionTypes';
import {questions} from '../utils/mockData';
import Button from './Button';
import {useTranslation} from 'react-i18next';

const HealthSurveyModal = props => {
  const {t, i18n} = useTranslation();
  const toggleModal = () => {
    props.healthSurveyShown(false);
  };

  const styles = StyleSheet.create({
    content: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 15,
      borderColor: colors.opacityBlack,
    },
    contentTitle: {
      textAlign: 'left',
      fontFamily: fonts.Semibold,
      color: colors.opacityBlack,
      fontSize: 15,
      marginBottom: 6,
    },
    contentSubTitle: {
      textAlign: 'left',
      fontFamily: fonts.Bold,
      fontSize: 22,
      marginBottom: 24,
    },
    contentQuestion: {
      fontFamily: fonts.Medium,
      fontSize: 17,
      marginBottom: 12,
    },
    questionContainer: {
      flexDirection: 'row',
      padding: 16,
      paddingBottom: 24,
      paddingTop: 24,
      flex: 1,
      justifyContent: 'space-between',
    },
    list: {
      width: '100%',
    },
    listSeparator: {
      height: 1,
      backgroundColor: colors.separatorColor,
    },
  });

  const Question = questionProps => {
    const question = questionProps.item;
    const checked =
      props.answers.hasOwnProperty(question.id) &&
      props.answers[question.id] === true;
    const handleTouch = () => {
      props.changedAnswer({id: question.id, answer: !checked});
    };

    return (
      <TouchableOpacity onPress={handleTouch} style={styles.questionContainer}>
        <Text style={styles.contentQuestion}>{question.questionText}</Text>
        <Image source={checked ? images.check : images.uncheck} />
      </TouchableOpacity>
    );
  };

  const ListSeparator = () => <View style={styles.listSeparator} />;

  const Questions = () => {
    return (
      <FlatList
        style={styles.list}
        data={questions}
        renderItem={Question}
        ItemSeparatorComponent={ListSeparator}
        keyExtractor={item => item.id + ''}
      />
    );
  };

  const values = Object.values(props.answers);

  var numberOfSymptoms =
    values.length > 0
      ? Object.values(props.answers).reduce(
          (p, c) => (c === true ? p + 1 : p),
          0,
        )
      : 0;

  var buttonMsg = `تأكيد ${numberOfSymptoms} أعراض`;

  if (numberOfSymptoms === 0) {
    buttonMsg = t('healthSurveyModal.noSymptoms');
  } else if (numberOfSymptoms === 1) {
    buttonMsg = t('healthSurveyModal.oneSymptom');
  } else if (numberOfSymptoms === 2) {
    buttonMsg = t('healthSurveyModal.twoSymptoms');
  }

  const pressedButton = () => {
    toggleModal();
    props.sendSurvey(props.answers);
  };
  return (
    <Modal
      isVisible={props.showSurvey}
      avoidKeyboard={true}
      swipeDirection="down"
      onSwipeComplete={toggleModal}>
      <SafeAreaView>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>
            {t('healthSurveyModal.title')}
          </Text>
          <Text style={styles.contentSubTitle}>
            {t('healthSurveyModal.contentSubtitle')}
          </Text>
          <Questions />
          <Button text={buttonMsg} onPress={pressedButton} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    showSurvey: state.home.showSurvey,
    answers: state.home.answers,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  // Action
  return {
    changedAnswer: response =>
      dispatch({
        type: actionTypes.CHANGED_ANSWER,
        value: {response},
      }),
    healthSurveyShown: show =>
      dispatch({
        type: actionTypes.HEALTH_SURVEY_SHOWN,
        value: show,
      }),
    sendSurvey: answers =>
      dispatch({
        type: actionTypes.SEND_SURVEY,
        value: answers,
      }),
  };
};

// Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HealthSurveyModal);
