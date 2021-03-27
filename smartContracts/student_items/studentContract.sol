pragma solidity >=0.7.0 <0.8.0;
pragma experimental ABIEncoderV2;

struct School {
  string schoolName;
  bool accepted;
}

/**
 * The  Student contract does this and that...
 */
contract  Student {
string firstName;
string lastName;
string photoLink;
School[4] schoolChoices;
address publicAddress;
string signature;
uint candidateId;
uint overallScore;
address[] candidateAddresses;


  constructor(string memory fName, string memory lname, string memory sig, string memory photo, string[4] memory schools ) public {
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
      for(uint i = 0; i <4; i++) {
        schoolChoices[i] = School(schools[i],false);
      }
    }

  }

  function registerAsCandidate (string memory examId, string memory candidSignature) public  returns(string memory, bool) {
    require(keccak256(abi.encodePacked(candidSignature)) == keccak256(abi.encodePacked(signature)));
    require( publicAddress == msg.sender);
    require( bytes(examId).length != 0);

    // call bool success =  examOrg.addCandidate();
    // considering returning the address of each candidate
    bool success = true;
    // assuming this returns a boolean
    if(success) {
      //candidateAddresses.push()
      return ("Successfully registered for exam", true);
    }

    return  ("Couldn't Register", false);
    
  }

// retrieves the schools student selected
  function getSchoolsSelected() public view returns (string[4] memory , bool) {
      string[4] memory names;
      for(uint i = 0; i< 4; i++) {
          names[i] = schoolChoices[i].schoolName;
      }
    return (names, true);
  }

  // only the student access this info
 function getStudentInfo () public view returns(string memory, string memory, string memory, string memory) {
  	require(msg.sender ==publicAddress);
    require( publicAddress == msg.sender);
 	return (firstName, lastName, photoLink, signature);
  	}

  // this will use the address of each candidate stored to get and combine for the overall score of the student
  function getScore() public view returns(string memory, uint) {
    uint score = 0;
    if(candidateAddresses.length ==0) {
      return ("No candidate score yet", 0);
    }

    for(uint i =0; i < candidateAddresses.length; i++)
       {
         // score += getCandidateScore(candidateAddresses[i]);
       }
      return ("Succes",score);
    }

  function getCandidateScore(address candidateAddy) internal returns(uint) {
        return 10;
  } 
  
  // have to review access again
  function setOverallScore (uint score) public returns(bool) {
    //figure out how to verify sender is exam org boss
    // require(msg.sender == );
  }

   
}