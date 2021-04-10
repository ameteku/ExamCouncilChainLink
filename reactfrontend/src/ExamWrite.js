import React from "react";
import questions from "./Questions";
import QAndA from "./QAndA";



function ExamWrite(){
    const [firstName,changeFirstName] = React.useState("Gianna");
    const [lastName,changeLastName] = React.useState("Torpey");

    function makeQuestionAndInput(question){
        return <QAndA question={question}/>
    }
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">Geography</a>
                    <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="dummy">
                        {firstName} {lastName}
                    </div>
                </div>
             </nav>
             <div className="questionAndAnswerPair">
                {questions.map(makeQuestionAndInput)}
             </div>
        </div>
    )
}

export default ExamWrite;