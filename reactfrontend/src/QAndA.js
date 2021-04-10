import React from "react";

function QAndA(props){
    const [currentAnswer, updateAnswer] = React.useState("");
    function updateValue(event){
        updateAnswer(event.target.value);
    }
    return (
        <div className="Pair">
            <p className="question">Question {props.number+1}: {props.question}</p>
            <textarea className="answer" value={currentAnswer} onChange={updateValue}/>
        </div>
    )
}

export default QAndA;