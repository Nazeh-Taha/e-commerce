import {
  PRODUCT_LIST_REQUIST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUIST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { productListReducer };
