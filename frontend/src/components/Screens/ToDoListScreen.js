import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  completeIncomplete,
  getToDos,
  toDoDel,
} from "../../Actions/toDosAction";
import AddToDos from "../AddToDos";
const ToDoListScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const userToDos = useSelector((state) => state.userToDos);
  const { todosInfo } = userToDos;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    console.log("I am in the heaven");
    if (!userToDos.todosInfo) {
      dispatch(getToDos());
    } else {
      console.log("I am inside");
      setUsername(userInfo.username);
      setName(userInfo.name);
      setEmail(userInfo.email);
      const { todosInfo } = userToDos;
    }
    // let blurBody = document.getElementById(`blurCard${index + 1}`);
    // data.complete
    //   ? (blurBody.style.filter = "blur(2px)")
    //   : (blurBody.style.filter = "blur(0px)");
  }, [history, userInfo, name, email, username]);
  return (
    <div>
      <AddToDos />
      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <div className="card">
          <div className="content">
            <div className="header">Full name: {userInfo?.name}</div>
            <div className="meta">Username: {userInfo?.username}</div>
            <div className="meta">Email: {userInfo?.email}</div>
          </div>
          <br></br>
        </div>
        <div className="ui stackable four column grid">
          <div className="ui cards">
            {todosInfo?.map((data, index) => {
              
              return (
                <div className="card">
                  <div id={`blurCard${index + 1}`} className="content">
                    <div className="header">{data.title}</div>
                    <div style={{ color: "green" }} className="meta">
                      Created: {data.created}
                    </div>
                    <div style={{ color: "red" }} className="meta">
                      Due Date: {data.dueDate}
                    </div>
                    <div className="description">{data.content}</div>
                  </div>
                  <div className="extra content">
                    <div className="ui two buttons">
                      <div
                        onClick={() => {
                          console.log(userInfo.todoListId, data._id, true);
                          dispatch(
                            toDoDel(userInfo.todoListId, data._id, true)
                          );
                        }}
                        className="ui basic red button"
                      >
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoListScreen;
