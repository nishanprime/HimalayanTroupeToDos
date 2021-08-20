import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../Actions/userActions";
const RegisterScreen = ({ history, location }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const redirect = location.search ? location.search("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);
  return (
    <div>
      <div className="center-screen">
        <form
          className="ui form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(register(name, username, email, password));
          }}
        >
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              name="full-name"
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="text"
              name="last-name"
              placeholder="Password"
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
            Create an account
          </button>
        </form>
        <div className="field">
          <Link to={`/login`}>Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
