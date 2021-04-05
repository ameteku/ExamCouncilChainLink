import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Route, Link} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Student from "./Student";
import Scores from "./Scores";
import ExamRegister from "./ExamRegister";

function App() {
  
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/student/home" component={Student}/>
      <Route exact path="/student/scores" component={Scores}/>
      <Route exact path="/student/examregister" component={ExamRegister}/>
    </div>
  );
}

export default App;
