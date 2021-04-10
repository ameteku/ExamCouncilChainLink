import React from "react";
import exams from "./Exams";
import {Link} from "react-router-dom";


function ExamSelect(){
    
    function makeListItem(exam){
        const examDetails = {
            examName: exam.examName,
            examID: exam.examID,
        }
        return (
            <Link style={{ textDecoration: 'none' }} 
            to="/student/examwrite" to={{ 
            pathname: "/student/examwrite", 
            examDetails}}>
            <p className="examItem examToRegister">{exam.examName}</p></Link>
        )
    }

    return (
        <div>
            <div className="header">
                <h1>Select your exam</h1>
            </div>
            <div className="examsList">
                {exams.map(makeListItem)}
            </div>
        </div>
    )
}

export default ExamSelect;