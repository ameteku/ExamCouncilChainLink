import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamRegister.css';
import { Link, useHistory } from 'react-router-dom';

function StudentsInExam(props) {
  const firstName = props.userInfo.firstName;
  const lastName = props.userInfo.lastName;
  const examID = props.userInfo.examID;
  const [studentsID, changeStudentsID] = React.useState([]);
  React.useEffect(() => {
    async function getData(url) {
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

      getData(`http://localhost:5000/studentsubmissions/${examID}/`)
        .then(data => {
            console.log(data);
            changeStudentsID(data);
        });
    }, []);

    function makeListItem(name) {
          return (
            <Link to={{pathname:"/teacher/marksubmission",userInfo:props.userInfo,studentID:name}}><li className="examToRegister">
              {name}
            </li></Link>
          );
      }

    return (
      <div>
      <ol>
      {studentsID.map(makeListItem)}
      </ol>
      </div>
    )
}

  export default StudentsInExam;
