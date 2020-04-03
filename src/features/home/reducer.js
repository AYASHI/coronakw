import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';

// initial dummy state
const initialState = {
  loading: false,
  healthState: 1,
  isSick: false,
  showSurvey: false,
  showTemperature: false,
  showPossibleInfections: false,
  answers: {},
};

// Just dummy reducer
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SEND_HEALTH_STATE: {
      return {
        ...state,
        healthState: action.value,
      };
    }

    case actionTypes.HEALTH_STATE_SENT: {
      return {
        ...state,
      };
    }

    case actionTypes.HEALTH_SURVEY_SHOWN: {
      return {
        ...state,
        showSurvey: action.value,
      };
    }

    case actionTypes.CHANGED_ANSWER: {
      //Need a new reference else the prop will not update because it's the same object being modified.  Is this the best way to do it?
      let newAnswers = JSON.parse(JSON.stringify(state.answers));
      newAnswers[action.value.response.id] = action.value.response.answer;

      return {
        ...state,
        answers: newAnswers,
      };
    }

    case actionTypes.CHANGED_ANSWER_YES_NO: {
      //Need a new reference else the prop will not update because it's the same object being modified.  Is this the best way to do it?
      let newAnswers = {}; //JSON.parse(JSON.stringify(state.answers));
      newAnswers[action.value.response.id] = action.value.response.answer;

      return {
        ...state,
        answers: newAnswers,
      };
    }

    case actionTypes.SEND_SURVEY: {
      return {
        ...state,
        answers: {},
      };
    }

    case actionTypes.SURVEY_SENT: {
      return {
        ...state,
        isSick: state.healthState != constants.HEALTHY, //TODO: this should be determined by the backend based on survey answers?
      };
    }

    case actionTypes.HEALTH_STATE_SENT: {
      return {
        ...state,
        // healthState: action.value,
      };
    }

    //TODO: spinner?
    case actionTypes.SEND_LOCATION: {
      return {
        ...state,
      };
    }

    //TODO: spinner?
    case actionTypes.LOCATION_SENT: {
      return {
        ...state,
      };
    }

    case actionTypes.TEMPERATURE_MODAL_SHOWN: {
      return {
        ...state,
        showTemperature: action.value,
      };
    }

    case actionTypes.SEND_TEMPERATURE: {
      return {
        ...state,
      };
    }

    /////  possible infections part

    case actionTypes.POSSIBLE_INFECTIONS_MODAL_SHOWN: {
      return {
        ...state,
        showPossibleInfections: action.value,
      };
    }

    case actionTypes.SEND_POSSIBLE_INFECTIONS: {
      return {
        ...state,
      };
    }

    case actionTypes.POSSIBLE_INFECTIONS_SENT: {
      return {
        ...state,
      };
    }

    // remaining days

    case actionTypes.FETCH_REMAINING_DAYS_SUCCESS: {
      return {
        ...state,
        quarantine: action.payload,
      };
    }

    case actionTypes.GET_LOCATION_SENT: {
      const { data: {isQuarantine, isLocationFilled, lastVitalStatusCategoryId, patientVitalStatus, chatRoomUrl}} = action.payload;
      return {
        ...state,
        isQuarantine: isQuarantine,
        shouldUpdateLocation: isQuarantine && !isLocationFilled,
        lastVitalStatusCategoryId,
        patientVitalStatusColor: patientVitalStatus.toLowerCase(),
        chatRoomUrl: chatRoomUrl,
        getLocationSent: true
      };
    }

    case actionTypes.SUBMIT_ANSWERS_SUCCESS: {
      return {
        ...state,
        answers: {} // clear previous answers
      }
    }
    case actionTypes.ANSWER_QUESTION: {
      return {
        ...state,
        answers: {} // clear previous answers
      }
    }

    /////
    default:
      return state;
  }
}
