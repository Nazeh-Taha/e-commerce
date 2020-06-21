import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUIST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUIST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
//user logout action
const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
};
//user login action
const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUIST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};
//new user register action
const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUIST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};
export { signin, register, logout };
