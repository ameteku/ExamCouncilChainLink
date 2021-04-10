import React from "react";
import exams from "./Exams";
import {Link} from "react-router-dom";


function ExamSelect(){
    function makeListItem(exam){
        return (
            <Link style={{ textDecoration: 'none' }} to="/student/examwrite"><li className="examItem">{exam.examName}</li></Link>
        )
    }

    return (
        <div>
            <div className="header">
                <h2>Select your exams</h2>
            </div>
            <div className="examsList">
                <ul className="list-unstyled">
                    {exams.map(makeListItem)}
                </ul>
            </div>
        </div>
    )
}

export default ExamSelect;