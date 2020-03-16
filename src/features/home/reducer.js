import * as actionTypes from '../../store/actionTypes';
import * as constants from "../../utils/constants";


// initial dummy state
const initialState = {
  loading: false,
  healthState: 1,
  isSick: false,
  showSurvey: false,
  answers: {}
};

// Just dummy reducer
export default function homeReducer(state = initialState, action) {
  console.log(action);
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
        // healthState: action.value,
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
        answers: newAnswers
      };
    }

    case actionTypes.SEND_SURVEY: {
      return {
        ...state,
        answers: {}
      };
    }


    case actionTypes.SURVEY_SENT: {
      return {
        ...state,
        isSick: state.healthState != constants.HEALTHY  //TODO: this should be determined by the backend based on survey answers?
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

    default:
      return state;
  }
}
