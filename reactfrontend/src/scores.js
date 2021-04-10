import React from "react";
import databaseScores from "./DatabaseScores";
import ExamScore from "./ExamScore";
import 'bootstrap/dist/css/bootstrap.min.css';

function Scores(){
    function makeExamScore(obj){
        return <ExamScore name={obj.name} score={obj.score}/>
    }
    return (
        <div>
            <div className="container-fluid">
                <table id="total votes" className="table table-hover text-centered">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {databaseScores.map(makeExamScore)}
                    </tbody>    
                </table>
            </div>
        </div>
    )
}

export default Scores;