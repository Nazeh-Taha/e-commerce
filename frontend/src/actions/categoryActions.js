import {
  IMAGE_SAVE_REQUEST,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAIL,
} from "../constants/categoryConstant";
import axios from "axios";
// create new category action
const saveCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/category", category, {
      headers: { Autorization: "Bearer" + userInfo.token },
    });
    dispatch({ type: IMAGE_SAVE_SUCCESS, payload: { data } });
  } catch (error) {
    dispatch({ type: IMAGE_SAVE_FAIL, payload: error.message });
  }
};

export { saveCategory };
