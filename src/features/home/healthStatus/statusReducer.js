import * as actionTypes from '../../../store/actionTypes';
import * as constants from '../../../utils/constants';
import reactotron from 'reactotron-react-native';

const initialState = {
  statusCategories: [],
  questions: [],
  questionsReady: false,
  questionsAnswers: [],
  currentQuestionIndex: -1,
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS: {
      return {
        ...state,
        statusCategories: action.payload,
      };
    }

    case actionTypes.FETCH_QUESTIONS_SUCCESS: {
      return {
        ...state,
        questions: action.payload.questions,
        vitalStatusId: action.payload.vitalStatusId,
        questionsReady: true,
        currentQuestionIndex: 0,
      };
    }

    case actionTypes.ANSWER_QUESTION: {
      const qa = state.questionsAnswers;
      qa.push(action.payload);
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        questionsAnswers: qa,
      };
    }

    case actionTypes.SUBMIT_ANSWERS_SUCCESS: {
      return {
        ...state,
        questions: [],
        questionsReady: false,
        questionsAnswers: [],
        currentQuestionIndex: -1,
      };
    }

    default:
      return state;
  }
}
