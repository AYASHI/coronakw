import * as actionTypes from '../../store/actionTypes'
function validateNationalIDSuccess(isSuccess) {
    return {
        type: actionTypes.CIVIL_ID_SENT,
        payload: {value: isSuccess},
      }
}
function validatePhoneNumberSuccess(isSuccess) {
    return {
        type: actionTypes.PHONE_NUMBER_SENT,
        payload: {value: isSuccess},
      }
}

function registrationSuccess(payload) {
    return {
        type: actionTypes.REGISTER_SENT,
        payload
      }
}

export default {
    validateNationalIDSuccess,
    validatePhoneNumberSuccess,
    registrationSuccess
}