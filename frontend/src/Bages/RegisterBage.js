import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

function RegisterBage(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Acount</h2>
          </li>
          <li>
            {loading && <div>Loading....</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <label htmlFor="repassword">RePassword</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => setRepassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit">Register</button>
          </li>
          <li>Alredy have Acount<Link to="/signin">signin</Link></li>
          <li>
            <Link to="/register">Create Acount</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterBage;
