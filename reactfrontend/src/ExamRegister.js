import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';
import { Link, useHistory } from 'react-router-dom';

function ExamRegister(props){
    const firstName = props.userInfo.firstName;
    const lastName = props.userInfo.lastName;
    const studentID = props.userInfo.studentID;
  
    function updateRegistration(examsID){
       
    }
    
    //fetch from database and use as React state
    const [examsID, changeExamsID] = React.useState([]);
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
    }

    const history = useHistory()
    function redirect (){
        history.push("/student/home");
    }

    React.useEffect(() => {
        async function getData(url) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }


          getData(`http://localhost:5000/getexamsforstudent/${studentID}`)
            .then(data => {
                changeExamsID(data.exams); // JSON data parsed by `data.json()` call
            });
      }, []);


    function submitInfo(){
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
                body: JSON.stringify({studentID:studentID, exams:examsID}) // body data type must match "Content-Type" header
              });
              return response.json(); // parses JSON response into native JavaScript objects
          }
          
        postData('http://localhost:5000/updateregistrationforstudent')
            .then(data => {
                console.log(data);
                redirect(); // JSON data parsed by `data.json()` call
            });
    }
    function onAdd(exam){
        if (containsObject(exam,examsID)){
            alert("You've already picked this");
        }
        else {
            
            changeExamsID(prevExams => {
                return [...prevExams,exam];
            })
        }
    }

    function removeExam(name) {
        changeExamsID((prevExams) => {
          return prevExams.filter(function (exam) {
            return exam !== name;
          });
        });
      }

    function makeListItem(name) {
        return (
          <p className="examToRegister" key={name} onClick={() => removeExam(name)}>
            {name}
          </p>
        );
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">Name_of_App</a>
                <div class="dummy">
                    {firstName} {lastName}
                </div>
            </div>
        </nav>
            <div className="container nav-padding">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Exam Registration</h1>
                        <div className="examsToRegister">
                        {examsID.map(makeListItem)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                    
                    <button onClick={submitInfo} className="submitbtn">Submit</button>
                    
                        <div className="dropdown">
                        
                            <button className="dropbtn">Add</button>
                            <div className="dropdown-content">
                                <a onClick={()=>onAdd("Geography")}>Geography</a>
                                <a onClick={()=>onAdd("History")}>History</a>
                                <a onClick={()=>onAdd("Math")}>Math</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamRegister;