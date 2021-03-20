pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

/**
 * The Candidate
 contract does this and that...
 */
    
contract Candidate {
     struct Exam {
        string examId;
        uint score;
        bool written;
    }
    
    uint id;
    string studentSignature;
    Exam[] exams;
    
  constructor(string memory signature,string memory examId) public {
      require(bytes(signature).length != 0);
      id = 1;
      
      studentSignature = signature;
      
      if(bytes(examId).length != 0) {
         exams.push( Exam(examId,0, false ));
      }
  }
  
  function getParticularExam(uint candidateId, string memory examId ) public view returns(Exam memory) {
      require(keccak256(abi.encodePacked(candidateId)) == keccak256(abi.encodePacked(id)));
      require(bytes(examId).length != 0);
      
      for(uint i = 0; i< exams.length; i++)
      {
          if(keccak256(abi.encodePacked(exams[i].examId)) ==keccak256(abi.encodePacked(examId)))
          {
              return exams[i];
          }
      }
      Exam memory empty;
      
      return empty;
  }
}

