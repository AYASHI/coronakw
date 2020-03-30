import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import i18n from "i18next";


const isnull = object => {
  return (
    object == null ||
    object === '' ||
    object === undefined ||
    object === {}
  )
}

export const isValidObject = object => {
  return (
    typeof object === 'object' &&
    object !== null &&
    Object.keys(object).length > 0
  )
}

export const isNotValidMobileNumber = object => {
  return (
    isnull(object) ||
    isNaN(object) ||
    object.toString().length != 8
  )
}



export const isNotValidCivilId = object => {
  return isnull(object) || isNaN(object) || object.toString().length != 12
}

export const isNotValidSerialNumber = object => {
    return isnull(object) || isNaN(object) || object.toString().length != 10
}

export const phoneNumberValidation = (object, message) => {
    return {
        message: message,
        func: isNotValidMobileNumber,
        object: object
    }
}

export const civilidValidation = (object, message) => {

    return {
        message: message,
        func: isNotValidCivilId,
        object: object
    }
}

export const serialNumberValidation = (object, message) => {
 
    return {
        message: message,
        func: isNotValidSerialNumber,
        object: object
    }
}

export const otpValidation = (object, message) => {
 
    return {
        message: message,
        func: isnull,
        object: object
    }
}

export const nameValidation = (object, message) => {
 
    return {
        message: message,
        func: isnull,
        object: object
    }
}


export const isNotValidEmailAddress = object => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = regex.test(object)
  return isnull(object) || !isValid
}

const validate = errormessage => validation => object => {
  if (validation(object)) {
    Alert.alert(
      "Validation error",
      `${errormessage}`,
      [{ text: "ok", style: 'cancel' }],
      { cancelable: true }
    )
    return false
  }
  return true
}

const validateWithoutAlert = errormessage => validation => object => {
  if (validation(object)) {
    return {
      valid: false,
      message: errormessage
    }
  }
  return {
    valid: true
  }
}

const validateAll = inputs => {
  for (const key in inputs.slice()) {
    const element = inputs[key]
    if (
      !validateWithoutAlert(element.message)(element.func)(
        element.object
      ).valid
    ) {
      return {
        valid: false,
        message: element.message
      }
    }
  }
  return {
    valid: true
  }
}

export { isnull, validate, validateWithoutAlert, validateAll }
