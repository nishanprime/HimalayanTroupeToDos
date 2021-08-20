import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Reducers/UserReducers";
import {
  addToDoListReducer,
  changeCompleteStatusReducer,
  deleteToDoReducer,
  getToDoListReucers,
} from "./Reducers/ToDoListsReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userToDos: getToDoListReucers,
  todoDelete: deleteToDoReducer,
  todoAdd: addToDoListReducer,
  changedStatus:changeCompleteStatusReducer
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
