import React from "react";

function TeacherQuadruplet(props){
    const [currentFeedbackAndScore, updateFS] = React.useState({Feedback:"",Score:""});
    props.onChange(currentFeedbackAndScore,props.number+1);
    function updateValue(event){
        const key = event.target.id;
        const value = event.target.value;
        updateFS(prevFS=>{
            return {...prevFS,[key]:value};
        });
    }
    
    return (
        <div className="Pair">
            <p className="question">Question {props.number+1}: {props.question}</p>
            <p>Student Answer: {props.answer}</p>
            <input placeholder="Feedback" id="Feedback" onChange={updateValue} className="answer" value={currentFeedbackAndScore.Feedback}/>
            <input placeholder="Score" id="Score" onChange={updateValue} className="answer" value={currentFeedbackAndScore.Score}/>
        </div>
    )
}

export default TeacherQuadruplet;