import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/userActions";
const HeaderScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div className="ui attached stackable menu">
        <div className="ui container">
          <div
            onClick={() => {
              userInfo && dispatch(logout());
            }}
            className="item"
          >
            <i className="grid layout icon"></i> {userInfo?"LogOut":"Welcome"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderScreen;
