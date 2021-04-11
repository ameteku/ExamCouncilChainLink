import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { Link } from "react-router-dom";

import IPFS from "ipfs" ;
const { globSource } = IPFS;

function Register() {

   
        
    function registerUser(event) {}
    return ( 
        <
        div className = "login text-center" >
        <
        form class = "form-signin" >
        <
        h1 class = "h1 mb-3 font-weight-normal" > Register Your Details < /h1>{" "} <
        label
        for = "inputStudentID"
        class = "sr-only" > { " " }
        Student ID { " " } <
        /label>{" "} <
        input type = "text"
        id = "inputStudentID"
        class = "form-control"
        placeholder = "Student ID"
        required autofocus /
        >
        <
        label
        for = "inputFirstName"
        class = "sr-only" > { " " }
        First Name { " " } <
        /label>{" "} <
        input type = "text"
        id = "inputFirstName"
        class = "form-control"
        placeholder = "First Name"
        required autofocus /
        >
        <
        label
        for = "inputLastName"
        class = "sr-only" > { " " }
        Last Name { " " } <
        /label>{" "} <
        input type = "text"
        id = "inputLastName"
        class = "form-control"
        placeholder = "Last Name"
        required autofocus /
        >
        <
        label
        for = "inputPassword"
        class = "sr-only" > 
        Password  <
        /label><
        input type = "password"
        id = "inputPassword"
        class = "form-control"
        placeholder = "Password"
        required /
        >
        <
        div class = "checkbox mb-3" > < /div>{" "} <
        button class = "btn btn-lg btn-primary btn-block"
        onClick = { registerUser }
        type = "submit" > 
        Register  <
        /button>{" "} <
        Link to = "/" >  <
        button class = "reg-button btn btn-lg btn-primary btn-block "
        type = "submit" onClick = "uploadImage()" > { " " }
        Back to Login { " " } <
        /button> < /
        Link > 
        <p class = "mt-5 mb-3 text-muted" > & copy; 2021 < /p>{" "}
        <input onChange={uploadImage} type="file" id ="file-input" accept="image/*" />
          
         </form > { " " } <
        /div>
    );
}
function uploadImage () {
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    // console.log(event.target.value);
    const fileInput  = document.getElementById("file-input");
        
    fileInput.addEventListener('input', (e) => pushFileToIPFS(e.target.files[0]));
};

//  ()=> {
//     console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiii");
//     const fileInput  = document.getelementById("file-input");
        
//     fileInput.addEventListener('change', (e) => pushFileToIPFS(e.target.files[0]));

//  }

 const pushFileToIPFS = async (file) => {
      const node = await  IPFS.create();
      const result =await node.add(file);
      console.log(result);

      return result;
 }

export default Register;