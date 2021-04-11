import React from "react";
//import questions from "./Questions";
import QAndA from "./QAndA";
import {Link} from "react-router-dom";

function ExamWrite(props){
    console.log(props)
    const firstName = props.location.examDetails.userInfo.firstName;
    const lastName = props.location.examDetails.userInfo.lastName;
    const studentID = props.location.examDetails.userInfo.studentID;

    const exam = props.location.examDetails.examName;
    const [questions,changeQuestions] = React.useState([]);
    React.useEffect(() => {
    async function getData(url) {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
      
      getData(`http://localhost:5000/getexam/${exam}/`)
        .then(data => {
            changeQuestions(data.questionsArray);
        });
    }, []); 
    var smth = {}
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
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">{exam}</a>
                    <div class="dummy">
                        {firstName} {lastName}
                    </div>
                </div>
             </nav>
             <div className="questionAndAnswerPair">
             <ol>
             {questions.map(makeQuestionAndInput)}
             </ol>
                
             </div>
        </div>
    )
}

export default ExamWrite;