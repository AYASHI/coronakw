import * as actionTypes from '../../../store/actionTypes';

export function fetchStatusCategories() {
    return{
        type: actionTypes.FETCH_STATUS_CATEGORIES
    }
}

export function fetchStatusCategoriesSuccess(categories) {
    return{
        type: actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS,
        payload:categories
    }
}

export function fetchStatusCategoriesFailed() {
    return{
        type: actionTypes.FETCH_STATUS_CATEGORIES_FAILED
    }
}


export function fetchQuestions() {
    return{
        type: actionTypes.FETCH_QUESTIONS
    }
}

export function fetchQuestionsSuccess(questions) {
    return{
        type: actionTypes.FETCH_QUESTIONS_SUCCESS,
        payload:questions
    }
}

export function fetchQuestionsFailed() {
    return{
        type: actionTypes.FETCH_QUESTIONS_FAILED
    }
}