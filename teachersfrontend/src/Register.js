import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function Register(props){
    function registerUser(event){
        props.updateUserInfo(currentInfo.markerID, currentInfo.firstName,
             currentInfo.lastName,currentInfo.password,currentInfo.examID)
    }

    const [currentInfo, updateInfo] = React.useState({});

   function handleInfoChange(event){
       const key = event.target.id;
       const value = event.target.value;
       updateInfo(prevInfo => {
           return {...prevInfo,[key]:value}
       });
   }

    console.log(currentInfo);

    return (
        <div className="login text-center">
            <form class="form-signin">
      <h1 class="h1 mb-3 font-weight-normal">Register Your Details</h1>
      <label for="inputStudentID" class="sr-only">Student ID</label>
      <input type="text" id="markerID" onChange={handleInfoChange} class="form-control" placeholder="Marker ID" required autofocus/>

      <label for="inputStudentID" class="sr-only">Exam ID</label>
      <input type="text" id="examID" onChange={handleInfoChange} class="form-control" placeholder="Exam ID" required autofocus/>

      <label for="inputFirstName" class="sr-only">First Name</label>
      <input type="text" id="firstName" onChange={handleInfoChange} class="form-control" placeholder="First Name" required autofocus/>

      <label for="inputLastName" class="sr-only">Last Name</label>
      <input type="text" id="lastName" onChange={handleInfoChange} class="form-control" placeholder="Last Name" required autofocus/>

      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="password" onChange={handleInfoChange} class="form-control" placeholder="Password" required/>
      <div class="checkbox mb-3">
      </div>
      <button class="btn btn-lg btn-primary btn-block" onClick={registerUser} type="button">Register</button>
      <Link to="/"><button class="reg-button btn btn-lg btn-primary btn-block " >Back to Login</button></Link>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
        </div>
    )
}

export default Register;
