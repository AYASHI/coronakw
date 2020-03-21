import * as actionTypes from '../../store/actionTypes';

// initial state
const initialState = {
  loading: false,
};

export default function coreReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.message,
      };
    }
    case actionTypes.SHOW_ERROR: {
        return {
          ...state,
          isError: true,
          errorMessage: action.message,
        };
      }
    case actionTypes.HIDE_ERROR: {
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };
    }
    /////
    default:
      return state;
  }
}
