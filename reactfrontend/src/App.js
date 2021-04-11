import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Route, Link, Redirect,useHistory} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Student from "./Student";
import Scores from "./Scores";
import ExamRegister from "./ExamRegister";
import ExamSelect from "./ExamSelect";
import ExamWrite from "./ExamWrite";
import TeacherMarking from "./TeacherMarking";

function App() {
  const  [logInInfo,updateLogInInfo] = React.useState({isLoggedIn:false,firstName:"",lastName:"",studentID:""});
  const history = useHistory()
  function redirect (){
    history.push("/student/home");
  }

  function redirectLogIn(){
    history.push("/");
  }

  console.log(logInInfo);
  function logIn(studentID, password){
    console.log("success");
    async function getData(url) {
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    
    getData(`http://localhost:5000/loginStudent/${studentID}/${password}`)
      .then(data => {
          console.log(data); 
          updateLogInInfo({isLoggedIn:true,firstName:data.firstName,lastName:data.lastName,studentID:data.studentID});
          redirect();
      });
  }

  function logOut(){
    updateLogInInfo({isLoggedIn:false,firstName:"",lastName:"",studentID:""});
    redirectLogIn();
  }

  function registerUser(studentID, firstName, lastName, password){

    async function postData(url) {
      // Default options are marked with *
      const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({studentID:studentID, firstName:firstName,lastName:lastName,password:password}) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    
  postData('http://localhost:5000/registerStudent')
      .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
          updateLogInInfo({isLoggedIn:true,firstName:firstName,lastName:lastName,studentID:studentID});
          redirect();
      });
  }
  return (
    <div className="App">
      <Route exact path="/" component={()=><Login logOut={logOut} updateUserInfo={logIn} userInfo={logInInfo}/>}/>
      <Route exact path="/register" component={()=><Register updateUserInfo={registerUser} userInfo={logInInfo}/>}/>
      <Route exact path="/student/home" component={()=><Student logOut={logOut} userInfo={logInInfo}/>}/>
      <Route exact path="/student/scores" component={()=><Scores logOut={logOut} userInfo={logInInfo}/>}/>
      <Route exact path="/student/examregister" component={()=><ExamRegister logOut={logOut}  userInfo={logInInfo}/>}/>
      <Route exact path="/student/examselect" component={()=><ExamSelect logOut={logOut} userInfo={logInInfo}/>}/>
      <Route exact path="/student/examwrite" component={ExamWrite}/>
      <Route exact path="/teacher/marksubmission" component={TeacherMarking}/>
    </div>
  );
}

export default App;
