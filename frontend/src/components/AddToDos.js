import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { userLoginReducer } from "../Reducers/UserReducers";
import { addToList } from "../Actions/toDosAction";
const AddToDos = ({ history }) => {
  const [startdate, setStartDate] = useState(Date.now());
  const [errorDate, setErrorDate] = useState(Date.now());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  return (
    <div>
      <div class="ui styled fluid accordion">
        <div id="openAddForm" class="title">
          <button
          class="ui primary button"
            onClick={() => {
              let toggle = document.getElementById("openAddForm");
              let contentBox = document.getElementById("contentBox");
              contentBox.classList.contains("active")
                ? contentBox.classList.remove("active")
                : contentBox.classList.add("active");
              toggle.classList.contains("active")
                ? toggle.classList.remove("active")
                : toggle.classList.add("active");
            }}
          >
            <i class="dropdown icon"></i>
            Create ToDo
          </button>
        </div>
        <div id="contentBox" class="content">
          <div class="transition visible">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                title &&
                  content &&
                  startdate &&
                  userInfo &&
                  dispatch(
                    addToList(title, content, startdate, userInfo.todoListId)
                  );
              }}
            >
              <div class="ui form">
                <div class="field">
                  <label>Title</label>
                  <textarea
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    rows="1"
                  ></textarea>
                </div>
                <div class="field">
                  <label>Description</label>
                  <textarea
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <br />
              {errorDate < Date.now() ? (
                <div>
                  <Error
                    Title={"Invalid Date/Time Selection"}
                    Content={
                      "Make sure your selected time is not less than the current time to make add button visible"
                    }
                  />
                </div>
              ) : null}
              <label>
                Due Date <i class="calendar icon"></i>
              </label>
              <DatePicker
                selected={startdate}
                showTimeSelect
                onChange={(date) => {
                  if (date <= Date.now()) {
                    setErrorDate(date);

                    console.log("Inavlid");
                    return;
                  }
                  setErrorDate(date);
                  setStartDate(date);
                }}
              />
              <br />
              <br />
              {startdate > Date.now() ? (
                <button className="ui button secondary" type="submit">
                  Add to the list
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToDos;
