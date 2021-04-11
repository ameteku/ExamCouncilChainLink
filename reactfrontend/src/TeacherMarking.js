import React from "react";
import QAndA from "./QAndA";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';
import TeacherQuadruplet from "./TeacherQuadruplet";
import { Link, useHistory } from 'react-router-dom';

function TeacherMarking(props){
    //const exam = props.location.examDetails.examName;
    const [answers,changeAnswers] = React.useState([]);
    const [questions, changeQuestions] = React.useState([]);
    const examID = "hist1";
    const studentID = "5656";
    const history = useHistory()
    function redirect (){
        history.push("/student/home");
    }
    var smth = {}
    function updateAnswers(FS, number){
        smth = {...smth,[number]:FS};
        console.log(smth);
    }

    React.useEffect(() => {
        async function getData(url) {
            const response = await fetch(url, {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
    
          getData(`http://localhost:5000/singlestudentsubmission/${studentID}/${examID}/`)
            .then(data => {
                console.log(data);
                changeAnswers(data.submission.answers);
                changeQuestions(data.exam.questionsArray);
            });
        }, []); 


    function makeQuadruplet(answer,index){
        return <TeacherQuadruplet onChange={updateAnswers} key={index} question={questions[index]} answer={answer} number={index}/>
    }

    function submitFeedback(){
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
                body: JSON.stringify({examid:examID,studentid:studentID,FS:smth}) // body data type must match "Content-Type" header
              });
              return response.json(); // parses JSON response into native JavaScript objects
          }
          
        postData('http://localhost:5000/updatestudentsubmission')
            .then(data => {
                console.log(data);
                redirect();
            });
    }

    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">{"exam"}</a>
                    <div class="dummy">
                    </div>
                </div>
             </nav>
             <div className="questionAndAnswerPair">
             <ol>
             {answers.map(makeQuadruplet)}
             </ol>
             
             <button onClick={submitFeedback} className="finalSubmit">Submit</button>
             </div>
        </div>
    )
}

export default TeacherMarking;