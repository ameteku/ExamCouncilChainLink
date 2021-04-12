pragma solidity ^0.6.0;
pragma abicoder v2;
import "./school.sol";

/**
 * The SchoolGovernment contract does this and that...
 */
contract SchoolGovernment {
  address president;
  mapping(string => School) schools;
  //School[] schools;
  
  constructor() public {
    president = msg.sender;
  }

  function addSchool(string memory schoolName, uint passingGrade, uint maxStudents) public  {
    require(msg.sender == president);

    School newSchool = new School(schoolName, passingGrade, maxStudents);
    schools[schoolName] = newSchool;
  }
  
  function getSchool(string memory school) external view returns(string memory, uint, uint) {
      return schools[school].getInfo();
  }
  
  function checkSchoolAcceptance(string[4] memory schoolNames, uint score) external {
      address studentAddy = msg.sender;
      //checks calls ffor each school to update the student contract with acceptance or decline
     for(uint i =0 ; i < schoolNames.length; i ++) {
         schools[schoolNames[i]].checkForAcceptance(score);
     }
  }
  
  function registerStudentinSchools(string[4] memory schoolNames) external {
      for(uint i = 0; i < schoolNames.length; i++) {
          schools[schoolNames[i]].addPotentialStudent();
      }
  }
  
}
