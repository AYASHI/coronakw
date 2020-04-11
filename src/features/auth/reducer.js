import * as actionTypes from '../../store/actionTypes';

// initial state
const initialState = {
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PHONE_NUMBER_SEND: {
      return {
        ...state,
        phoneNumber: action.payload.phone,
      };
    }
    case actionTypes.SEND_OTP: {
      return {
        ...state,
        otp: action.value,
      };
    }
    case actionTypes.SET_CIVIL_INFORMATION: {
      return {
        ...state,
        civilID: action.payload.civilID,
        serialNumber: action.payload.serialNumber,
      };
    }
    default:
      return state;
  }
}
