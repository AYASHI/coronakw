import * as actionTypes from '../../../store/actionTypes';
import * as constants from '../../../utils/constants';

const initialState = {
  statusCategories: []
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {  
    case actionTypes.FETCH_STATUS_CATEGORIES_SUCCESS: {
      return {
        ...state,
        statusCategories: action.payload
      }
    }  
    default:
      return state;
  }
}
