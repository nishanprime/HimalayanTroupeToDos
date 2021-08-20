import React, { useEffect, useState } from "react";
import { login } from "../../Actions/userActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Login = ({ history, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    console.log("hi");
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  return (
    <div className="center-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(username, password));
        }}
        className="ui form"
      >
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="first-name"
            placeholder="Enter your Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="last-name"
            placeholder="Enter your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <div className="ui checkbox">
            <input type="checkbox" tabindex="0" className="hidden" />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
      <div className="field">
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          New Customer? Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
