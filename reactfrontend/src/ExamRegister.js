import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';

function ExamRegister(props){
    function updateRegistration(){

    }
    const {firstName,lastName} = props.location.studentDetails || {};
    //fetch from database and use as React state
    const [examsID,changeExamsID] = React.useState([]);
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
        return false;
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
                <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
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