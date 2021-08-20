export const getToDoListReucers = (state = {}, action) => {
  switch (action.type) {
    case "GET_TODOS_REQUEST":
      return { loading: true };
      break;
    case "GET_TODOS_SUCCESS":
      return { loading: false, todosInfo: action.payload };
      break;
    case "GET_TODOS_FAIL":
      return { loading: false, error: action.payload };
      break;
    case "TODOS_RESET":
      return {};
    default:
      return state;
      break;
  }
};

export const deleteToDoReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_REQUESTED":
      return { loading: true };
      break;
    case "DELETE_SUCCESS":
      return { loading: false, deletedInfo: action.payload };
      break;
    case "DELETE_FAIL":
      return { loading: false, error: action.payload };

      break;
    default:
      return {};
      break;
  }
};

export const addToDoListReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_REQUEST":
      return { loading: true };
      break;
    case "ADD_SUCCESS":
      return { loading: false, newlyAddedToDo:action.payload};
      break;
    case "ADD_FAIL":
      return {loading:false,error:action.payload}
      break;
    default:
      return state;
  }
};

export const changeCompleteStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_REQUEST":
      return { loading: true };
      break;
    case "EDIT_SUCCESS":
      return { loading: false, newlyChangedStatus:action.payload};
      break;
    case "EDIT_FAIL":
      return {loading:false,error:action.payload}
      break;
    default:
      return state;
  }
};