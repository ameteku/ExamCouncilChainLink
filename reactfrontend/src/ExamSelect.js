import React from "react";
//import exams from "./Exams";
import {Link} from "react-router-dom";

function ExamSelect(props){
    const [exams,changeExams] = React.useState([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/getexamsforstudent", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({studentID: '123'},
            )
        })
          .then(results => results.json())
          .then(data => {
            changeExams(data.exams);
          });
      }, []);
    const firstName = "Gianna";
    const lastName = "Torpey";
    function makeListItem(exam){
        const examDetails = {
            examName: exam,
            examID: "555",
        }
        return (
            <Link style={{ textDecoration: 'none' }} 
            to="/student/examwrite" to={{ 
            pathname: "/student/examwrite", 
            examDetails}}>
            <p className="examItem examToRegister">{exam}</p></Link>
        )
    }

    return (
        <div>
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">Name_of_App</a>
                <div class="dummy">
                    {firstName} {lastName}
                </div>
            </div>
        </nav>
        <div className="nav-padding"></div>
            <div className="header nav-padding">
                <h1>Select your exam</h1>
            </div>
            <div className="examsList">
                {exams.map(makeListItem)}
            </div>
        </div>
    )
}

export default ExamSelect;