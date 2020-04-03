import * as actionTypes from '../../../store/actionTypes';

export const fetchStatusCategories = () => dispatch =>
  dispatch({
    type: actionTypes.FETCH_STATUS_CATEGORIES,
  });

export function fetchStatusCategoriesSuccess(categories) {
  return {
    type: actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function fetchStatusCategoriesFailed() {
  return {
    type: actionTypes.FETCH_STATUS_CATEGORIES_FAILED,
  };
}

export function fetchQuestions(QuestionCategoryId, PatientId) {
  return {
    type: actionTypes.FETCH_QUESTIONS,
    payload: {QuestionCategoryId, PatientId},
  };
}

export function fetchQuestionsSuccess(questions) {
  return {
    type: actionTypes.FETCH_QUESTIONS_SUCCESS,
    payload: questions,
  };
}

export function fetchQuestionsFailed() {
  return {
    type: actionTypes.FETCH_QUESTIONS_FAILED,
  };
}

export function questionAnswered(answer) {
  return {
    type: actionTypes.ANSWER_QUESTION,
    payload: answer,
  };
}

export function changeAnswer(response) {
  return {
    type: actionTypes.CHANGED_ANSWER,
    value: {response},
  };
}

export function changeAnswerYesNo(response) {
  return {
    type: actionTypes.CHANGED_ANSWER_YES_NO,
    value: {response},
  };
}

export function submitAnswers(payload) {
  return {
    payload,
    type: actionTypes.SUBMIT_ANSWERS,
  };
}

export function submitAnswersSuccess(data) {
  return {
    type: actionTypes.SUBMIT_ANSWERS_SUCCESS,
    payload: data,
  };
}

export function submitAnswersFailed() {
  return {
    type: actionTypes.SUBMIT_ANSWERS_FAILED,
  };
}
