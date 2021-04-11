import React from "react";

function QAndA(props){
    const [currentAnswer, updateAnswer] = React.useState("");
    props.onChange(currentAnswer,props.number+1);
    function updateValue(event){
        updateAnswer(event.target.value);
    }
    
    return (
        <div className="Pair">
            <p className="question">Question {props.number+1}: {props.question}</p>
            <textarea id={props.number+1} onChange={updateValue} className="answer" value={currentAnswer}/>
        </div>
    )
}

export default QAndA;