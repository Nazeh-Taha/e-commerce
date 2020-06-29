import {
  IMAGE_SAVE_REQUEST,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAIL,
} from "../constants/categoryConstant";

function saveCategoryReducer(state = { category: {} }, action) {
  switch (action.type) {
    case IMAGE_SAVE_REQUEST:
      return { loading: true };
    case IMAGE_SAVE_SUCCESS:
      return { loading: false, success: true, payload: action.payload };
    case IMAGE_SAVE_FAIL:
      return { loading: false, success: false, payload: action.payload };
    default:
      return state;
  }
}

export {saveCategoryReducer};