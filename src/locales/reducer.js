import * as actionTypes from '../store/actionTypes';

// initial state
const initialState = {
  current: null,
};

export default function languageReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE: {
      return {
        ...state,
        current: action.value,
      };
    }
    default:
      return state;
  }
}
