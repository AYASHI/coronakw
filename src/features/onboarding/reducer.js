import * as actionTypes from '../../store/actionTypes';

// initial state
const initialState = {
  isLoading: false,
};

export default function onBoardingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SENT: {
      return {
        ...state,
        isRegisterationSuccess: action.payload ? true : false,
        token: action.payload.Token,
        userId: action.payload.UserId,
        isHomeQuarantine: action.payload.IsHomeQuarantine
      };
    }
    case actionTypes.TEMPERATURE_SENT: {
      return {
        ...state,
        temperatureRecorded: action.payload,
      };
    }
    case actionTypes.LOCATION_SENT: {
      return {
        ...state,
        locationSent: action.payload,
      };
    }
    case actionTypes.TEMPERATURE_RESET: {
      return {
        ...state,
        temperatureRecorded: null,
        shownFromOnBoarding: action.value,
      };
    }
    /////
    default:
      return state;
  }
}


export  function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SENT: {
      return {
        ...state,
        token: action.payload.Token,
        userId: action.payload.UserId,
      };
    }
    default:
      return state;
  }
}
