import React from "react";
import questions from "./Questions";
import QAndA from "./QAndA";
import {Link} from "react-router-dom";

function ExamWrite(props){
    const studentDetails = props.location.studentDetails || {};
    const {firstName,lastName} = studentDetails;
    const { examName, examID} =
    (props.location && props.location.examDetails) || {};
    console.log(props.location);
    function makeQuestionAndInput(question,index){
        return <QAndA key={index} question={question} number={index}/>
    }
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">{examName}</a>
                    <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="dummy">
                        {firstName} {lastName}
                    </div>
                </div>
             </nav>
             <div className="questionAndAnswerPair">
             <button className="backBtn"><Link to={{pathname:"/student/examselect",studentDetails}}>Go Back</Link></button>
             <ol>
             {questions.map(makeQuestionAndInput)}
             </ol>
                
             </div>
        </div>
    )
}

export default ExamWrite;