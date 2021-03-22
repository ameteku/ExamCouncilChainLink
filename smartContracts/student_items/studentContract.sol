pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;


/**
 * The  Student contract does this and that...
 */
contract  Student {
string firstName;
string lastName;
string photoLink;
string[] schoolChoices;
address publicAddress;
string privateKey;
string publicKey;
string signature;
uint candidateId;
uint overallScore;


  constructor(string memory fName, string memory lname, string memory sig, string memory photo, string[] memory schools ) public {
      require(bytes(fName).length!= 0);
      require(bytes(lname).length!= 0);
      require(bytes(sig).length!= 0);
      require(bytes(photo).length!= 0);
    publicAddress = msg.sender;
    firstName = fName;
    lastName = lname;
    signature = sig;
    photoLink =photo;
    if(schools.length!= 0) {
      for(uint i = 0; i <schools.length; i++) {
        schoolChoices.push(schools[i]);
      }
    }

  }

  function registerAsCandidate (string memory examId, string memory candidSignature) public  returns(string memory, bool) {
    require(keccak256(abi.encodePacked(candidSignature)) == keccak256(abi.encodePacked(signature)));
    require( publicAddress == msg.sender);
    require( bytes(examId).length != 0);

    // call bool success =  examOrg.addCandidate();
    bool success = true;
    // assuming this returns a boolean
    if(success) {
      return ("Successfully registered for exam", true);
    }

    return  ("Couldn't Register", false);
    
  }

// retrieves the schools student selected
  function getSchoolsSelected() public view returns (string[] memory , bool) {
    return (schoolChoices, true);
  }

  // only the student access this info
 function getStudentInfo () public view returns(string memory, string memory, string memory, string memory) {
  	//require(keccak256(abi.encodePacked(_sig)) == keccak256(abi.encodePacked(signature)));
    require( publicAddress == msg.sender);
 	return (firstName, lastName, photoLink, signature);
  	}

  function getScore() public view returns(uint) {
    return score;
  }
  
  // have to review access again
  function setOverallScore (uint score) public returns(bool) {
    //figure out how to verify sender is exam org boss
    // require(msg.sender == );
  }
  	  
}