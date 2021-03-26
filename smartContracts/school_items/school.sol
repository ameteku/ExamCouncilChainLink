pragma solidity ^0.7.0;

/**
 * The School contract does this and that...
 */
 
contract School {
  uint acceptanceScore;
  string name;
  address[] candidatesAccepted;
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

//this will be called by the student contract. an external call to the student contract for their score will be made using their address
  function checkForAcceptance(uint score) {
    if(score == passingGrade) {
      studentAccepted.push(msg.sender);
    }
    //thinking of making an looped call( from student-> school -> to student ) as no return values are allowed on the evm
address student = msg.sender;
require(student.call(bytes4(keccak256("setPassFlag(bool)")), score == passingGrade));

  }
}
