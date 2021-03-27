pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

struct CandidateInfo {
        uint randomeNumber;
        string[] questions;
        string[] answers;
        bool marked;
        uint score;

    }
    
contract Marker {
    

    string firstName;
    string lastName;
    address bossAddress;
    CandidateInfo[] CandidatesAssigned;
    string ExamId;


    constructor (string memory fName, string memory lName, string memory examId) {
        require(bytes(fName).length != 0);
        require(bytes(lName).length != 0);
        require(bytes(examId).length != 0);
        bossAddress = msg.sender;
    }

    function addCandidate(uint candidateRandomNumber,string[] memory questions, string[] memory answers ) public returns(string memory) {
        require(msg.sender == bossAddress);
        require(candidateRandomNumber != 0);
        require(questions.length != 0);
        require(answers.length != 0);

        CandidatesAssigned.push(CandidateInfo(candidateRandomNumber, questions, answers, false, 0));
    }

    //function getScore() 


}