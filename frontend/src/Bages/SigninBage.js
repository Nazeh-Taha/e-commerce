import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

function SigninBage(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign In</h2>
          </li>
          <li>
            {loading && <div>Loading....</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit">Sign in</button>
          </li>
          <li>Create New Acount?</li>
          <li>
            <Link to="/register">Create Acount</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninBage;
