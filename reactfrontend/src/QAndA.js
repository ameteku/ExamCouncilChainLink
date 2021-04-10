import React from "react";

function QAndA(props){
    const [currentAnswer, updateAnswer] = React.useState("");
    function updateValue(event){
        updateAnswer(event.target.value);
    }
    return (
        <div>
            <p className="question">{props.question}</p>
            <input value={currentAnswer} onChange={updateValue}/>
        </div>
    )
}

export default QAndA;