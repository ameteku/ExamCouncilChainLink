pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

struct ExamQuestion {
    uint id;
    string question;
    string answer;
}

contract  Exam is VRFConsumerBase{
    
    uint id;
    address public creatorSignator;
    ExamQuestion[] questions; // redundant
    string examPaperAddress;
    uint[]  questionNumbers;
    uint totalNumberOfQuestions;
    uint[2] questionRange;
     bytes32 internal keyHash;
    uint256 internal fee;
    uint internal randomSeed;
    
   uint[] randomQuestions;
    

    constructor () VRFConsumerBase(
          0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
          0xc5817D3e37bc74Da54985fdeE45F355012d719a4   // LINK Token
        ) public {
         keyHash =  0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
        creatorSignator = msg.sender;
        id = 200; //will be using chainlink vrf for this
        randomSeed = 20;
    }
    
    event AllQuestionsGenerated(uint numberOfQuestions, address exam);
    
    function addQuestions(string[] memory newQuestions, string[] memory questionAnswers, address bossMan)  
    public  returns (string memory, bool) {
        require(newQuestions.length != 0);
        require(questionAnswers.length != 0);
        require(bossMan != address(0));
        
        if(bossMan != creatorSignator) {
            return ("false bossId", false);
        }
        
        
        uint i =0;
        uint j = 0;
        for(; i<newQuestions.length && j < questionAnswers.length ;) {
            j++;
            i++;
            questions.push(ExamQuestion(202,newQuestions[i], questionAnswers[i]));
            // answers.push(questionAnswers[j]);
        }
        
    }
    
    function removeQuestions(string memory questionId, address bossMan)  
    public  returns (string memory, bool) {
        require(bytes(questionId).length != 0);
        require(bossMan != address(0));
        
        if(bossMan != creatorSignator) {
            return ("false bossId", false);
        }
        
        for(uint i =0; i<questions.length ; i++) {
            if(keccak256(abi.encodePacked(questionId)) ==keccak256(abi.encodePacked(questions[i].id))) {
                string memory element = questions[i].question;
                questions[i] = questions[questions.length - 1];
                delete questions[questions.length - 1];
                //questions.length--;
                return (element, true);
            } 
        }
        
    }

    // this is option two where if the questions were stored of chain , each of them will be numbered and their range of numbers willcbe passed as an argument
    //into this function alongside the total number of questions needed. This will randomly select the questions to be used on the exam and send the selections back
    function generateQuestionNumbers(uint totalExamQuestions, uint[2] memory questionNumberRange) public returns(uint[] memory, bool) {
        require(creatorSignator == msg.sender);
        require(totalExamQuestions != 0);
        require(questionNumberRange.length == 2);
        
        totalNumberOfQuestions = totalExamQuestions;
        questionRange[0] = questionNumberRange[0];
        questionRange[1] = questionNumberRange[1];
        
        for(uint i =0; i <totalExamQuestions; i++) {
           getRandomNumber(randomSeed);
           randomSeed += randomSeed * randomSeed; // ensuring that a new seed is used everytime
           
        }

        return  (questionNumbers, true);
    }

    function setAnswers(string[] memory answers ) public returns(string memory, bool) {
        require(creatorSignator == msg.sender);
        
        if(answers.length != questions.length) {
            return ("Answer range not same as question range. Send total range (set unaswered questions as null if not answered)", false);
        }

        for(uint i = 0 ; i < answers.length; i++) {
            questions[i].answer = answers[i];
        }

        return ("Successfully written to memory", true);
    }
    
    function getId() public view returns(uint) {
        require(msg.sender == creatorSignator);
        return id;
    }
    
    
    /*
    * functions for using chainlink requestRandomness
    */
    
    
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        
        //require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }
   
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        //  {
        // randomQuestions.push( randomness.mod(questionRange[1]).add(1));
        // if(randomQuestions.length == totalNumberOfQuestions) 
        // emit AllQuestionsGenerated(randomQuestions.length, creatorSignator);
        // }
        
        
    }
    
    // This should only be called when the AllQuestionsGenerated event has been emitted
    function getQuestions() public view returns (uint[] memory) {
        return randomQuestions;
    }
    
    
     /**
     * Withdraw LINK from this contract
     * 
     * DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES.
     */
    function withdrawLink() external {
        require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
    }


}