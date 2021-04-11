import React from "react";
//import exams from "./Exams";
import {Link} from "react-router-dom";

function ExamSelect(props){
    const [exams,changeExams] = React.useState([]);
    React.useEffect(() => {
        async function getData(url) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
  
          getData('http://localhost:5000/getexamsforstudent/123')
            .then(data => {
                changeExams(data.exams); // JSON data parsed by `data.json()` call
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
            to="/student/examwrite">
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
            <button style={{marginRight:"260px"}}className="backBtn"><Link to={{pathname:"/student/home",}}>Go Back</Link></button>
                <h1>Select your exam</h1>
            </div>
            <div className="examsList">
                {exams.map(makeListItem)}
            </div>
        </div>
    )
}

export default ExamSelect;