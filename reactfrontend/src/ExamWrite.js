import React from "react";
//import questions from "./Questions";
import QAndA from "./QAndA";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';
import { Link, useHistory } from 'react-router-dom';

function ExamWrite(props){
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
    const history = useHistory()
    function redirect (){
        history.push("/student/home");
    }
    var smth = {}
    function updateAnswers(answer, number){
        smth = {...smth,[number]:answer};
        console.log(smth);
    }
    function makeQuestionAndInput(question,index){
        return <QAndA onChange={updateAnswers} key={index} question={question} number={index}/>
    }

    function submitAnswers(){
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
                body: JSON.stringify({answers:smth,examName:exam,studentID:studentID}) // body data type must match "Content-Type" header
              });
              return response.json(); // parses JSON response into native JavaScript objects
          }
          
        postData('http://localhost:5000/submitExam')
            .then(data => {
                console.log(data);
                redirect(); // JSON data parsed by `data.json()` call
            });
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
             
             <button onClick={submitAnswers} className="finalSubmit">Submit</button>
             </div>
        </div>
    )
}

export default ExamWrite;