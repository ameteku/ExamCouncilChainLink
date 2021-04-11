import React from "react";
//import questions from "./Questions";
import QAndA from "./QAndA";
import {Link} from "react-router-dom";

function ExamWrite(props){
    const [questions,changeQuestions] = React.useState([]);
    //const studentDetails = props.location.studentDetails || {};
    //const {firstName,lastName} = studentDetails;
    //const { examName, examID} =
    //(props.location && props.location.examDetails) || {};
    React.useEffect(() => {
        fetch("http://localhost:5000/getexam", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            
        })
          .then(results => results.json())
          .then(data => {
            changeQuestions(data.examsQuestions);
          });
      }, []); 
    console.log(props.location);
    var smth = {1:"",2:"",3:""}
    function updateAnswers(answer, number){
        console.log(answer);
        console.log(number);
        smth = {...smth,[number]:answer};
        console.log(smth);
    }

    function makeQuestionAndInput(question,index){
        return <QAndA onChange={updateAnswers} key={index} question={question} number={index}/>
    }
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">Name_of_App</a>
                    <div class="dummy">
                        {"Gianna"} {"Torpey"}
                    </div>
                </div>
             </nav>
             <div className="questionAndAnswerPair">
             <button className="backBtn"><Link to={{pathname:"/student/examselect",}}>Go Back</Link></button>
             <ol>
             {questions.map(makeQuestionAndInput)}
             </ol>
                
             </div>
        </div>
    )
}

export default ExamWrite;