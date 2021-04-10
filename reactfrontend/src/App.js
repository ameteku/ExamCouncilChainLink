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
import ExamSelect from "./ExamSelect";
import ExamWrite from "./ExamWrite";

function App() {
  
  return (
    <div className="App">
      <Route exact path="/" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/student/home" component={Student}/>
      <Route exact path="/student/scores" component={Scores}/>
      <Route exact path="/student/examregister" component={ExamRegister}/>
      <Route exact path="/student/examselect" component={ExamSelect}/>
      <Route exact path="/student/examwrite" component={ExamWrite}/>
    </div>
  );
}

export default App;
