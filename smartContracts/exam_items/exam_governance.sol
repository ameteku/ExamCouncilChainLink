
pragma solidity >=0.6.0 <0.8.0;
import './Exam.sol';
import './Candidate.sol';
pragma experimental ABIEncoderV2;



contract ExamCouncil {
    address bossAddy;
mapping( address => Candidate) candidates;
    mapping(string => Exam) exams;
    string[] examIds;
    
    constructor ( string memory firstExamId) public {
        // require(bytes(candidateIds).length != 0);
        // require( bytes(firstExamId).length != 0);

                    if(bytes(firstExamId).length != 0) {
                        exams[firstExamId] =  Exam(msg.sender);
                        examIds.push(firstExamId);
                    }
    }
    
//     function writeExam(string memory candidateId, string memory fingerprint, string memory examId) 
//     public view returns(string memory, bool) {
//         require(bytes(candidateId).length != 0 );
//         require(bytes(fingerprint).length != 0 );
//         require(bytes(examId).length != 0 );
        
//         string memory candidateWriting;
//         string memory currentExamId;
        
//         for(uint i = 0; i< candidates.length; i++) {
//             if(keccak256(abi.encodePacked(candidateId)) == keccak256(abi.encodePacked(candidates[i]))) {
//                 candidateWriting = candidateId;
//                 break;
//             }
//         }
        
//         // return if candidate not found
//         if(bytes(candidateWriting).length == 0 ) {
//             return ("Candidate Not Found", false);
//         }
        
//         //finding exam
//         for(uint i = 0; i< examIds.length; i++) {
            
//             if(keccak256(abi.encodePacked(examId)) == keccak256(abi.encodePacked(examIds[i]))) {
//                 currentExamId = examId;
//                 break;
//             }
//         }
        
//         // return if exam not found
//         if(bytes(currentExamId).length == 0 ) {
//             return ("Exam not found", false);
//         }
        
//         int score;
//         //Exam currentExam;
//         for (uint i = 0; i< exams.length; i++) {
//             if(keccak256(abi.encodePacked(currentExamId)) == keccak256(abi.encodePacked(examIds[i]))) {
//             //score = exams[i].write();
            
//             return ('Exam written', true);
//         }
//     }
// }

    function registerAsCandidate(string memory examId, address student) public returns(address) {
        bool isExam = false;
        for(uint i = 0; i < examIds.length; i++) {
            if(keccak256(abi.encodePacked(examId)) == keccak256(abi.encodePacked(examIds[i]))) {
                isExam = true;
                break;
            }
        }

        if(isExam) {
        Candidate newCandidate = new Candidate(student, examId,bossAddy);

         address name = address(newCandidate);
        candidates[name] = newCandidate;

        return name;
        }
        
        return address(0);
        

    }
    
    // set candidate answers
    function setCandidateAnswers(string memory IPFSLink) public returns (bool) {
       candidates[msg.sender].setAnswerhash(IPFSLink);

    }
    
    function addExam(string memory examId) public {

        //require( msg.sender == bossAddy);
        exams[examId] = new Exam();

        
    }
    
    function getExamIds() public view returns(string[] memory) {
        
        return examIds;
        
    }
    
    function submitAnswers(string memory ipfsLink) public returns (bool) {
       require(candidates[msg.sender].setAnswerhash(ipfsLink));

       return true;
    }
}