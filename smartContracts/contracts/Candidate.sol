pragma solidity >=0.6.0 <0.8.0;
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
    uint[] scores;
    string answersIPFSLink;

    
  constructor(address studentAddy, string memory exam, address examOAddy) public {
      //require(bytes(signature).length != 0);
      randomIdFromVRF = 1;
      examOrgAddy = examOAddy; //willbe used as verification for some functions
      candidateAddy = msg.sender;
      //studentSignature = signature;
      examId = exam;
  }

  function getScores() public view returns (uint [] memory) {
      
    // return candiate score
    return scores;
      
     // studentAddy.call(bytes4(keccak256("setOverallScore(uint256)")), studentScore);
  }
  
  //used by marker to add score of students
  function setScore(uint[] memory answerScores) public returns (bool) {
   // require(msg.sender == candidateAddy, "No");
   for(uint i = 0; i< answerScores.length; i++) {
       scores.push(answerScores[i]);
   }
  }

  function setAnswerhash (string memory IPFSLink) public  {
    require(msg.sender == candidateAddy, "Not the candidate");
    answersIPFSLink = IPFSLink;
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


