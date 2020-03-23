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
        isSuccess: action.payload,
      };
    }
    /////
    default:
      return state;
  }
}
