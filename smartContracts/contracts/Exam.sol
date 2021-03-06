pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

struct ExamQuestion {
    uint id;
    string question;
    string answer;
}

contract Exam {
    uint id;
    address public creatorSignator;
    ExamQuestion[] questions;
    uint[]  questionNumbers;

    
    constructor (address bossMan) public {
       //require(bytes(firstQuestion).length != 0);
        //require(bytes(answer).length != 0);
        require(bossMan != address(0));
        
        //questions.push(ExamQuestion(101,firstQuestion, answer));
        // answers.push(answer);
        creatorSignator = bossMan;
        id = 200; //will be using chainlink vrf for this
    }
    
    function addQuestions(string[] memory newQuestions, string[] memory questionAnswers, address bossMan)  
    public  returns (string memory, bool) {
        require(newQuestions.length != 0);
        require(questionAnswers.length != 0);
        require(bossMan != address(0));
        
        if(bossMan != creatorSignator) {
            return ("false bossId", false);
        }
        
        
        uint i =0;
        uint j = 0;
        for(; i<newQuestions.length && j < questionAnswers.length ;) {
            j++;
            i++;
            questions.push(ExamQuestion(202,newQuestions[i], questionAnswers[i]));
            // answers.push(questionAnswers[j]);
        }
        
    }
    
    function removeQuestions(string memory questionId, address bossMan)  
    public  returns (string memory, bool) {
        require(bytes(questionId).length != 0);
        require(bossMan != address(0));
        
        if(bossMan != creatorSignator) {
            return ("false bossId", false);
        }
        
        for(uint i =0; i<questions.length ; i++) {
            if(keccak256(abi.encodePacked(questionId)) ==keccak256(abi.encodePacked(questions[i].id))) {
                string memory element = questions[i].question;
                questions[i] = questions[questions.length - 1];
                delete questions[questions.length - 1];
                //questions.length--;
                return (element, true);
            } 
        }
        
    }

    // this is option two where if the questions were stored of chain , each of them will be numbered and their range of numbers willcbe passed as an argument
    //into this function alongside the total number of questions needed. This will randomly select the questions to be used on the exam and send the selections back
    function generateQuestions(uint totalExamQuestions, uint[2] memory questionNumberRange) external returns(uint[] memory, bool) {
        require(creatorSignator == msg.sender);
        require(totalExamQuestions != 0);
        require(questionNumberRange.length == 2);

        uint questionSelected;
        //uint[] memory examQuestions;
        for(uint i =0; i <totalExamQuestions;) {
            bool duplicate = false;
            questionSelected = 200000000 % questionNumberRange[1];

            for(uint b = 0; b< questions.length ; b++) {
                if(questions[b].id == questionSelected) {
                    duplicate = true;
                    break;
                }  
            }
            if(!duplicate) {
                questions.push(ExamQuestion(questionSelected, "", ""));
                questionNumbers.push(questionSelected);
                i++;
                duplicate = false;
            }
        }

        return  (questionNumbers, true);
    }

    function setAnswers(string[] memory answers ) public returns(string memory, bool) {
        require(creatorSignator == msg.sender);
        
        if(answers.length != questions.length) {
            return ("Answer range not same as question range. Send total range (set unaswered questions as null if not answered)", false);
        }

        for(uint i = 0 ; i < answers.length; i++) {
            questions[i].answer = answers[i];
        }

        return ("Successfully written to memory", true);
    }
    
}