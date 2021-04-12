const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require("./db/models/student.js");
const Exam = require("./db/models/exam.js");
const Marker = require("./db/models/marker.js");
const Submission = require("./db/models/submission.js");
var cors = require('cors')
const app = express();
app.use(cors())
const fs = require('fs')

//ipfs imports
const IPFS = require('ipfs-api');
conat ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'httpd'})


const port =  5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/testexamcouncilDB",{ useUnifiedTopology: true, useNewUrlParser: true });

// for ethereum contracts
const Tx = require("ethereumjs-tx").Transaction
const  Web3 = require('web3')
const web3 = new Web3('https://kovan.infura.io/v3/a23217e338ca49568cc09f48b145c875');

const myAccount = '0xc5817D3e37bc74Da54985fdeE45F355012d719a4';
const myprivKey = Buffer.from('66a90e9740aba4594fba733fc05c2d42b981082055218f05484eb1a4cb66f6a0', 'hex')

const mainABI  =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"bool","name":"deployed","type":"bool"}],"name":"ExamGovDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"string","name":"examName","type":"string"},{"indexed":false,"internalType":"bool","name":"added","type":"bool"}],"name":"examAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"student","type":"address"},{"indexed":false,"internalType":"string","name":"examName","type":"string"},{"indexed":false,"internalType":"bool","name":"added","type":"bool"}],"name":"registerCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"student","type":"address"},{"indexed":false,"internalType":"bool","name":"registered","type":"bool"}],"name":"studentAdded","type":"event"},{"inputs":[{"internalType":"string","name":"examId","type":"string"}],"name":"addExam","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"fname","type":"string"},{"internalType":"string","name":"lname","type":"string"},{"internalType":"string","name":"IPFSPhotoLink","type":"string"},{"internalType":"string[4]","name":"schools","type":"string[4]"}],"name":"addStudent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deployExamGovernment","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"examGovAddy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"examGovernment","outputs":[{"internalType":"contract ExamCouncil","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalNumber","type":"uint256"}],"name":"getQuestions","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStudentExams","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"examId","type":"string"}],"name":"registerAsCandidate","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"IPFSLink","type":"string"}],"name":"submitAnswer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const mainContractAddress = "0x442778c94587Df7955E0a2e479ae8cAbC0B0b62f"

var studentAddy;

//event to call
const processEvent = (eventType, latestBlock, ) => {
    if(eventType == 'studentAdded') {
        mainContract.getPastEvents(
        eventType,
        {
            fromBlock: 0,
            toBlock: 'latest'
        },
        (err, events) => {
            if(err == null) {
                if(events[0].returnValues.registered == true) {
                    studentAddy = events[0].returnValues.student
                }
            }
        })
    }
    else if( eventType == 'registerCandidate'){
        mainContract.getPastEvents(
        eventType,
        {
            fromBlock: 0,
            toBlock: 'latest'
        },
        (err, events) => {
            if(err == null) {
                if(events[0].returnValues.added == true) {
                    console.log("has been added on blockchain", events[0].returnValues.examName)
                }
            }
        })
    }
}


// create exam submission file
    const createFile = (studentId, submission) =>{
    //create the submission file
    const fileName = studentId + "_submission.txt";
    fs.writeFile(fileName, submission, function (err) {
  if (err) throw err;

  
  console.log('Saved studwent submission!');
});
    }
//the processes to be run
const mainContract = new web3.eth.Contract(mainABI, mainContractAddress);


//const addExam = mainContract.methods.addExam(examName);



//running th eprocess
const process = (processCall, eventType ) => {
    web3.eth.getTransactionCount(myAccount, (err, txCount) => {

 nextFunction = processCall.encodeABI();
//creating transaction stuff
const txObject = {
    nonce:  web3.utils.toHex(txCount),
    gasLimit : web3.utils.toHex(8000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: mainContractAddress,
    data: nextFunction
}

//sign transaction
const tx = new Tx(txObject, { chain: 'kovan'})
tx.sign(myprivKey)
const serializeTx = tx.serialize()
const raw = '0x' + serializeTx.toString('Hex')

// send of transaction
web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash: ', txHash)
}).on('confirmation', async  (confNum, receipt, lastestBlockHash)=>  {
    console.log('receipt is: ', receipt);
    await processEvent(eventType, lastestBlockHash);
    return
})

})
}

app.get('/loginStudent/:studentID/:password', (req,res)=> {
    const studentID = req.params.studentID;
    const password = req.params.password;
    Student.findOne({student_id: studentID},function (err,student){
        if (err){
            console.log(err);
        }
        else{
            if (student){
            if (student.pw === password){
                res.send({studentID:studentID, firstName:student.first_name, lastName:student.last_name});
            }
            else {
                res.send({response:"Wrong Password"});
            }
        }
        else {
            res.send({response:"User does not exist"});
        }
        }
    })
});

app.get("/getexam/:exam", (req, res) => {
    const examName = req.params.exam;
    console.log(examName);
    Exam.findOne({exam_name:examName}, function(err,exam){
        if (err){
            console.log(err)
        }
        else{
            console.log(exam);
            res.send(exam);
        }
    }); 
});

app.post("/registerStudent", async (req,res)=>{
    const studentID = req.body.studentID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pw = req.body.password;
   
    const registerStudent = mainContract.methods.addStudent(firstName, lastName, 'random', ['sdfd','sdfs','sdfds','sdfd'])

    await process(registerStudent, 'studentAdded')
         const student = new Student({
        student_id: studentID,
        first_name: firstName,
        last_name: lastName,
        public_add: studentAddy,
        examsArray: [],
        pw: pw,
        photos: "image2.jpg"
    });
         student.save(function(err){
        if (err){
            console.log(err)
        }
        else{

            res.send({studentID:studentID, firstName:firstName, lastName:lastName, password:pw});
        }
    });
});

app.get('/getexamsforstudent/:studentID', (req, res) => {
    const studentID = req.params.studentID;
    Student.find({student_id: studentID},function (err,students){
        if (err){
            console.log(err)
        }
        else {
            // The exam length will be passed into the contract, an event containing the selected numbers will be returned and those questions will be passed to the student
              //  const getExam = mainContract.methods.addStudent(firstName, lastName, 'random', ['sdfd','sdfs','sdfds','sdfd'])

            res.send({exams: students[0].examsArray});
        }
    }); 
  });



app.post('/updateregistrationforstudent', async (req, res)=>{
    const studentID = req.body.studentID;
    const exams = req.body.exams;

    
    registerCandidate = mainContract.methods.registerAsCandidate(exams[0])
    await process(registerCandidate, 'registerCandidate')

    Student.updateOne({student_id:studentID},{examsArray:exams}, function(err){
        if (err){
            console.log(err);
        }
        else{
            
            res.send({response:"All good!"});
        }
    });
    console.log(studentID);
    console.log(exams);
    
})

app.post('/submitExam', (req, res)=>{
    const studentID = req.body.studentID;
    const examName = req.body.examName;
    console.log(examName);
    const examAnswers = Object.values(req.body.answers);
    Exam.findOne({exam_name:examName},function(err,exam){
        if(err){
            console.log(err);
        }
        else{
            
            if (exam){

                const sub = new Submission({
                    student_id: studentID,
                    exam_id: exam.exam_id,
                    answers: examAnswers,
                    score: 0
                })

                createFile(req.body.answers,req.body.studentID).;


                 const submitAnswers = mainContract.methods.addStudent(firstName, lastName, 'random', ['sdfd','sdfs','sdfds','sdfd'])

                sub.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send({response:"All Good"});
                    } 
                });
            }
            else {
                res.send({response:"exam does not exist"});
            }
    }
    });
})


app.get('/api/hello', (req, res) => {
res.send({first:"Gianna",last:"Torpey"});
});

app.post("/getscores", (req, res) => {
    const studentID = "123";
    Submission.find({student_id: studentID},function (err,submissions){
        if (err){
            console.log(err)
        }
        else {
            res.send({studentSubs: submissions});
        }
    });
});







app.listen(port, () => console.log(`Listening on port ${port}`));
