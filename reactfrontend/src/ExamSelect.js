import React from "react";
import exams from "./Exams";
import {Link} from "react-router-dom";


function ExamSelect(props){
    const studentDetails = props.location.studentDetails;
    const {firstName,lastName} = studentDetails;
    function makeListItem(exam){
        const examDetails = {
            examName: exam.examName,
            examID: exam.examID,
        }
        return (
            <Link style={{ textDecoration: 'none' }} 
            to="/student/examwrite" to={{ 
            pathname: "/student/examwrite", 
            examDetails,
            studentDetails
            }}>
            <p className="examItem examToRegister">{exam.examName}</p></Link>
        )
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
        <div className="nav-padding">
            <div className="header">
                <h1>Select your exam</h1>
            </div>
            
            <div className="examsList">
            <button className="backBtn"><Link to={{pathname:"/student/home",studentDetails}}>Go Back</Link></button>
                {exams.map(makeListItem)}
            </div>
        </div>
        </div>
    )
}

export default ExamSelect;