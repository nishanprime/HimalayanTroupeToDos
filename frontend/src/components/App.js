import React from "react";
import "./app.css";
import HeaderScreen from "./Screens/HeaderScreen";
import Login from "./Screens/Login";
import RegisterScreen from "./Screens/RegisterScreen";
import ToDoListScreen from "./Screens/ToDoListScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddToDos from "./AddToDos";
const App = () => {
  return (
    <Router>
      <HeaderScreen />
      <br />
      <br />
      <Route path="/" exact component={ToDoListScreen} />
      <Route path="/login"  component={Login} />
      <Route path="/register"  component={RegisterScreen} />
      
    </Router>
  );
};

export default App;
