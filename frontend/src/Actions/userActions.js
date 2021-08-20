import axios from "axios";
export const login = (username, password) => async (dispatch) => {
  try {
    console.log("hello");
    dispatch({
      type: "LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { username, password },
      config
    );
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.message,
    });
  }
};

export const logout = (location) => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("todosInfo");
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "TODOS_RESET" });
  
};

export const register =
  (username, email, name, password) => async (dispatch) => {
    try {
      dispatch({
        type: "REGISTER_REQUEST",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("I am here");
      const { data } = await axios.post(
        "/api/users",
        { username, email, name, password },
        config
      );
      console.log("I am here");
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: data,
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.message,
      });
    }
  };
