import * as actionTypes from '../../store/actionTypes';


// initial dummy state
const initialState = {
  loading: false,
  healthState: 1
};

// Just dummy reducer
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_HEALTH_STATE: {
      return {
        ...state,
        healthState: action.value,
      };
    }

    default:
      return state;
  }
}
