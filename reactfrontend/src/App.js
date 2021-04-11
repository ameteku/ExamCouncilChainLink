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
  const  [logInInfo,updateLogInInfo] = React.useState({isLoggedIn:false,firstName:"",lastName:"",studentID:""});
  function logIn(studentID,password){
    console.log("success");
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    
    getData(`http://localhost:5000/loginStudent/${studentID}/${password}`)
      .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
      });
  }
  return (
    <div className="App">
      <Route exact path="/" component={()=><Login updateUserInfo={logIn} userInfo={logInInfo}/>}/>
      <Route exact path="/register" component={()=><Register userInfo={logInInfo}/>}/>
      <Route exact path="/student/home" component={()=><Login userInfo={logInInfo}/>}/>
      <Route exact path="/student/scores" component={()=><Scores userInfo={logInInfo}/>}/>
      <Route exact path="/student/examregister" component={()=><ExamRegister userInfo={logInInfo}/>}/>
      <Route exact path="/student/examselect" component={()=><ExamSelect userInfo={logInInfo}/>}/>
      <Route exact path="/student/examwrite" component={()=><ExamWrite userInfo={logInInfo}/>}/>
    </div>
  );
}

export default App;
