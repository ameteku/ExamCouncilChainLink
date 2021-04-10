import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';

function ExamRegister(){
    //fetch from database and use as React state
    const [examsID,changeExamsID] = React.useState([]);
    const [currentExamID,updateCurrentExamID] = React.useState("");

    function onAdd(exam){
        changeExamsID(prevExams => {
            return [...prevExams,exam];
        })
        updateCurrentExamID("");
    }

    function updateState(event) {
        updateCurrentExamID(event.target.value);
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
            <div className="container">
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
                        <div class="dropdown">
                            <button class="dropbtn">Add</button>
                            <div class="dropdown-content">
                                <a onClick={()=>onAdd("Geography")}>Geography</a>
                                <a onClick={()=>onAdd("History")}>History</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamRegister;