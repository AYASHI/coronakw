import * as actionTypes from '../../store/actionTypes';
import * as constants from '../../utils/constants';

// initial state
const initialState = {
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CIVIL_ID_SEND: {
      return {
        ...state,
        civil_id: action.value,
      };
    }
    case actionTypes.CIVIL_ID_SENT: {
      return {
        ...state,
        isRegistered: action.payload.value,
      };
    }
    case actionTypes.PHONE_NUMBER_SEND: {
      return {
        ...state,
        phoneNumber: action.value,
      };
    }
    case actionTypes.PHONE_NUMBER_SENT: {
      return {
        ...state,
        isPhoneNumberValid: action.payload.value,
      };
    }
    case actionTypes.SEND_OTP: {
      return {
        ...state,
        otp: action.value,
      };
    }
    case actionTypes.OTP_SENT: {
      return {
        ...state,
        isOTPVerified: action.payload.value,
      };
    }
    /////
    default:
      return state;
  }
}
