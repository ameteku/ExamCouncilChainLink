import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';

function ExamRegister(){
    //fetch from database and use as React state
    const [examsID,changeExamsID] = React.useState(["hi","haruman"]);
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
          <li key={name} onClick={() => removeExam(name)}>
            {name}
          </li>
        );
    }
    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Exam Registration</h1>
                        <ul className="list-unstyled">
                        {examsID.map(makeListItem)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="input-group">
                        <div className="inputAdd">
                            <input value={currentExamID} onChange={updateState}/>
                            <div className="button" onClick={() => onAdd(currentExamID)}>Add</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamRegister;