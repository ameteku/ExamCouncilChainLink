pragma solidity >=0.7.0 <0.8.0;


/**
 * The  Student contract does this and that...
 */
contract  Student {

string firstName;
string lastName;
string photoLink;
string signature;
uint candidateId;
//candidate registeredCandidate;

  constructor(string memory fName, string memory lname, string memory sig, string memory photo ) public {
      require(bytes(fName).length!= 0);
      require(bytes(lname).length!= 0);
      require(bytes(sig).length!= 0);
      require(bytes(photo).length!= 0);
    firstName = fName;
    lastName = lname;
    signature = sig;
    photoLink =photo;
  }

 function getStudentInfo (string memory _sig) public view returns(string memory, string memory, string memory, string memory) {
  	require(keccak256(abi.encodePacked(_sig)) == keccak256(abi.encodePacked(signature)));
 	return (firstName, lastName, photoLink, signature);
  	}
  	  
}

 // will be used to register  a student as a candidate.
 // function registerasCandidate(string ExamName) {
 // 	//
 // }



