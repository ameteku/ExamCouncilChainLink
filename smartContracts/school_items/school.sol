pragma solidity ^0.6.0;

/**
 * The School contract does this and that...
 */
 
contract School {
  uint acceptanceScore;
  string name;
  address[] studentsAccepted;
  address[] studentsApplied;
  uint maxCapacity;
  address owner;
  
  constructor(string memory schoolName, uint passingGrade,uint max) public {
    require(bytes(schoolName).length != 0);
    require(passingGrade != 0);

    owner = msg.sender;
    name = schoolName;
    acceptanceScore = passingGrade;
    maxCapacity =max;
  }
  
  function addPotentialStudent() public {
      studentsApplied.push(msg.sender);
  }

    //this will check the address of student calling against the list of registered students and determine if they are candidatesAccepted
    // then it will call a function in the candidate to relay that info
  function checkForAcceptance(uint score) public {
      
      for(uint i = 0; i< studentsApplied.length; i ++) {
          if(studentsApplied[i] == msg.sender) {
              
              address student = msg.sender;
              
              if(score >= acceptanceScore) {
                studentsAccepted.push(msg.sender);
              }
            //thinking of making an looped call( from student-> school -> to student ) as no return values are allowed on the evm
            //require(student.call(bytes4(keccak256("setPassFlag(bool)")), score >= acceptanceScore))
            return;
             }
    }
  }
  
  function getInfo() public view returns(string memory, uint, uint) {
      return (name, acceptanceScore, maxCapacity);
  }
}
