import axios from "axios";

export const getToDos = () => async (dispatch, getState) => {
  try {
    console.log("I am hererer");
    dispatch({
      type: "GET_TODOS_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/users/mytodos", config);
    dispatch({
      type: "GET_TODOS_SUCCESS",
      payload: data,
    });
    // localStorage.setItem("todosInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "GET_TODOS_FAIL",
      payload: error.message,
    });
  }
};

export const toDoDel =
  (todoListId, todoid, shallDel) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "DELETE_REQUESTED",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const reqBody = {
        toDoListId: todoListId,
        dataId: todoid,
        shallDelete: shallDel,
      };
      console.log(reqBody);

      const { data } = await axios.put("/api/users/mytodos", reqBody, config);
      reqBody.toDoListId.length > 0 &&
        dispatch({
          type: "DELETE_SUCCESS",
          payload: data,
        });
        dispatch(getToDos())
    } catch (error) {
      dispatch({
        type: "DELETE_FAIL",
        payload: error.message,
      });
    }
  };

  export const completeIncomplete =
  (shallEdit, toDoListID, dataId,complete) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "EDIT_REQUESTED",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const reqBody = {
        toDoListId: toDoListID,
        dataId: dataId,
        shallEdit: shallEdit,
        complete:complete
      };

      const { data } = await axios.put("/api/users/mytodos", reqBody, config);
      console.log(data)
      reqBody.toDoListId.length > 0 &&
        dispatch({
          type: "EDIT_SUCCESS",
          payload: data,
        });
    } catch (error) {
      dispatch({
        type: "EDIT_FAIL",
        payload: error.message,
      });
    }
  };

export const addToList =
  (title, content, dueDate,toDoListId) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADD_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const reqBody = {
        title: title,
        content: content,
        dueDate: dueDate,
        toDoListId:toDoListId,
        createNow:true
      };
      console.log(reqBody)
      const { data } = await axios.post("/api/users/mytodos", reqBody, config);
      dispatch({
        type: "ADD_SUCCESS",
        payload: data,
      });
      dispatch(getToDos())
    } catch (error) {
      dispatch({
        type: "ADD_FAIL",
        payload: error.message,
      });
    }
  };
