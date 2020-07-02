import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
} from "../constants/categoryConstant";

function saveCategoryReducer(state = { category: {} }, action) {
  switch (action.type) {
    case CATEGORY_SAVE_REQUEST:
      return { loading: true };
    case CATEGORY_SAVE_SUCCESS:
      return { loading: false, success: true, payload: action.payload };
    case CATEGORY_SAVE_FAIL:
      return { loading: false, success: false, payload: action.payload };
    default:
      return state;
  }
}

function categoryListReducer(state = { categories: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { saveCategoryReducer, categoryListReducer };
