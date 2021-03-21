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
    
    constructor (string memory firstQuestion, string memory answer, address bossMan) public {
       require(bytes(firstQuestion).length != 0);
        require(bytes(answer).length != 0);
        require(bossMan != address(0));
        
        questions.push(ExamQuestion(101,firstQuestion, answer));
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
    
    
    
}