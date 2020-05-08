import React, {Fragment, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import fonts from '../utils/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../utils/colors';
import Spacer from './Spacer';
const YesNoQuestion = props => {
  const {t} = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState();
  const Question = questionProps => {
    const borderWidth = questionProps.index === selectedIndex ? 1 : 1;
    const borderColor =
      questionProps.index === selectedIndex
        ? colors.mustard
        : colors.borderColor;

    const questionSelected = () => {
      setSelectedIndex(questionProps.index);
      props.onQuestionSelected(questionProps.index);
    };
    return (
      <View style={[styles.question, {borderWidth, borderColor}]}>
        <TouchableOpacity onPress={questionSelected}>
          <View style={styles.questionSubContainer}>
            <Text style={styles.questionTitle}>{questionProps.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Fragment>
      <Text style={styles.title}>{t('onboarding.travelOutsideKuwait')}</Text>
      <View style={styles.questionsContainer}>
        <Question title={t('yesNoQuestion.yes')} index={1} />
        <Spacer horizontal={true} />
        <Question title={t('yesNoQuestion.no')} index={2} />
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.Medium,
    fontSize: 17,
    textAlign: 'left',
  },
  questionsContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  question: {
    flex: 1,
    borderRadius: 6,
    height: 48,
  },
  questionSubContainer: {
    justifyContent: 'center',
    height: 48,
    paddingEnd: 16,
    paddingStart: 16,
  },
  questionTitle: {
    fontFamily: fonts.REGULAR,
    fontSize: 17,
    textAlign: 'left',
  },
});
export default YesNoQuestion;
