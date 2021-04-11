pragma solidity ^0.6.0;
import './student.sol';
// import './school_gov.sol';
import './ExamGov.sol';
pragma experimental ABIEncoderV2;



contract Main {
    mapping(address => Student) students;
    //address[] students;
    ExamCouncil public examGovernment;
    address  public examGovAddy;
    bool examGovDeployed = false;
    address boss;
    
    
    constructor() public {
        boss  = msg.sender;
    }
    
    // //only allowed to deploy once
    // function deploySchoolGovernment() public returns(string memory) {
    //     require(schoolGovDeployed == false);
    //     schoolGovernment = new SchoolGovernment();
    //     schoolGovDeployed = true;
    //      return "Successfully deployed School Government";
    // }
    
    // only allowed to deploy once
    
    function deployExamGovernment() public returns(string memory) {
        require(examGovDeployed == false);
        ExamCouncil government=new ExamCouncil("");
        examGovAddy = address(government);
        examGovernment = government;
        examGovDeployed = true;
        return "Successfully deployed exam Government";
    }
    
    //adding a student to the contract
    function addStudent(string memory fname, string memory lname, string memory photo, string[4] memory schools) public returns(bool) {
       require(msg.sender == boss);
        Student tempStudent = new Student(fname, lname, photo, schools);
        students[msg.sender] = tempStudent;
        return true;
    }
    
    function addExam(string memory examId) public returns(bool) {
        
        //require(boss == msg.sender);
        examGovernment.addExam(examId);
        return true;
        
    }
    
    function registerAsCandidate (string memory examId ) public returns( string memory, bool){
        
        if(students[msg.sender].getAddress() != address(0)) {
        address candidateAddress = examGovernment.registerAsCandidate(examId, msg.sender);
        students[msg.sender].addCandidate(candidateAddress, examId);
        return ("Success", true);

        }
        else {
            return ("student not found", false);
        }
    }
    
    // functions for writing an exam 
    // this will be used on the student side 
    
    // gets the student exam address
    function getStudentExams() public view returns (string [] memory ) {
         return students[msg.sender].getExams();
    }
    
    //returning examquestions based on the exam selection( this will only be allowed once) 
    function getQuestions(uint totalNumber) public view returns (uint[] memory) {
        
        
    }
    
    //submitting answers
    function submitAnswer(string memory IPFSLink ) public returns(bool) {
        examGovernment.submitAnswers(IPFSLink);
    }
    
    
    
}