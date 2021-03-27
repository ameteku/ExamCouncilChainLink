pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

/**
 * The Candidate
 contract does this and that...
 */
    
contract Candidate {
     
    uint randomIdFromVRF;
    string studentSignature;
    address candidateAddy;
    address examOrgAddy;
    string examId;
    uint score;
    string[] studentHashedAnswers;

    
  constructor(address studentAddy, string memory exam, address examOAddy) public {
      //require(bytes(signature).length != 0);
      randomIdFromVRF = 1;
      examOrgAddy = examOAddy; //willbe used as verification for some functions
      candidateAddy = msg.sender;
      //studentSignature = signature;
      examId = exam;
  }

  function getScore() public view returns (uint) {
      require(msg.sender == candidateAddy);
  
    // return candiate score
    return score;
      
     // studentAddy.call(bytes4(keccak256("setOverallScore(uint256)")), studentScore);
  }
  
  function setScore() public returns (uint number) {
    require(msg.sender == candidateAddy);
    score = number;
  }

  function setAnswerhashes (string[] memory answers) public  {
    require(msg.sender == candidateAddy);
    if(answers.length != 0) {
        for(uint i =0; i <answers.length; i++) {
        studentHashedAnswers.push(answers[i]);
        }
    }
  }

}
//   function getParticularExam(uint candidateId, string memory examId ) public view returns(Exam memory) {
//       require(keccak256(abi.encodePacked(candidateId)) == keccak256(abi.encodePacked(id)));
//       require(bytes(examId).length != 0);
      
//       for(uint i = 0; i< exams.length; i++)
//       {
//           if(keccak256(abi.encodePacked(exams[i].examId)) ==keccak256(abi.encodePacked(examId)))
//           {
//               return exams[i];
//           }
//       }
//       Exam memory empty;
      
//       return empty;
//   }


