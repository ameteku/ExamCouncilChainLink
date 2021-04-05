import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

function Register(){
    function registerUser(event){

    }
    return (
        <div className="login text-center">
            <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Register Your Details</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" onClick={registerUser} type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
        </div>
    )
}

export default Register;