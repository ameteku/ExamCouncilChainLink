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
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/testexamcouncilDB",{ useUnifiedTopology: true, useNewUrlParser: true });

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

app.post("/registerStudent", (req,res)=>{
    const studentID = req.body.studentID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pw = req.body.password;
    const student = new Student({
        student_id: studentID,
        first_name: firstName,
        last_name: lastName,
        public_add: "0x11",
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
            res.send({exams: students[0].examsArray});
        }
    }); 
  });

app.post('/updateregistrationforstudent', (req, res)=>{
    const studentID = req.body.studentID;
    const exams = req.body.exams;
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
