import {
  PRODUCT_LIST_REQUIST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";
import axios from "axios";
const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUIST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) =>(dispatch)=>{
try{
dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
const {data} = await axios.get("/api/products/" + productId);
dispatch({type: PRODUCT_DETAILS_REQUEST, payload: data});

}catch(error){
dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
}
}
export { listProducts, detailsProduct };
