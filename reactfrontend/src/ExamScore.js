import React from "react";

function ExamScore(props){

    return (<tr>
        <td>{props.name}</td>
        <td>{props.score}</td>
    </tr>)
}

export default ExamScore;