import React from "react";
import ReactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import {Link} from "react-router-dom";

function Login(props){
    function loginUser(event){
        props.updateUserInfo(currentID,currentPassword)
    }
    const [currentID, updateStudentID] = React.useState("");
    const [currentPassword, updateStudentPassword] = React.useState("");
    
   function handleIDChange(event){
       updateStudentID(event.target.value);
   }

   function handlePasswordChange(event){
       updateStudentPassword(event.target.value);
   }

    return (
        <div className="login text-center">
            <form class="form-signin">
                <h1> Welcome</h1>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputID" class="sr-only">StudentID</label>
                <input type="text" onChange={handleIDChange} value={currentID} id="inputEmail" class="form-control" placeholder="Student ID" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password"  onChange={handlePasswordChange} value={currentPassword} id="inputPassword" class="form-control" placeholder="Password" required/>
                <button class="btn btn-lg btn-primary btn-block" onClick={loginUser} type="button">Sign in</button>
                <Link to="/register"><button class="reg-button btn btn-lg btn-primary btn-block ">Register</button></Link>
                <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </div>
    )
}

export default Login;