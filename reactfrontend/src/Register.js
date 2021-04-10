import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import {Link} from "react-router-dom";

function Register(){
    function registerUser(event){

    }
    return (
        <div className="login text-center">
            <form class="form-signin">
      <h1 class="h1 mb-3 font-weight-normal">Register Your Details</h1>
      <label for="inputStudentID" class="sr-only">Student ID</label>
      <input type="text" id="inputStudentID" class="form-control" placeholder="Student ID" required autofocus/>
      
      <label for="inputFirstName" class="sr-only">First Name</label>
      <input type="text" id="inputFirstName" class="form-control" placeholder="First Name" required autofocus/>
      
      <label for="inputLastName" class="sr-only">Last Name</label>
      <input type="text" id="inputLastName" class="form-control" placeholder="Last Name" required autofocus/>
      
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" onClick={registerUser} type="submit">Register</button>
      <Link to="/"><button class="reg-button btn btn-lg btn-primary btn-block " type="submit">Back to Login</button></Link>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
        </div>
    )
}

export default Register;