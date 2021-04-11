const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require("./db/models/student.js");
const {Exam, examsSchema} = require("./db/models/exam.js");
const Marker = require("./db/models/marker.js");
const Submission = require("./db/models/submission.js");
var cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/testexamcouncilDB",{ useUnifiedTopology: true, useNewUrlParser: true });



app.get('/getexamsforstudent/:studentID', (req, res) => {
    const studentID = req.params.studentID;
    Student.find({id: studentID},function (err,students){
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
    console.log(studentID);
    console.log(exams);
    res.send("All good!");
})

app.post('/submitExam', (req, res)=>{
    const studentID = req.body.studentID;
    const examID = req.body.examID;
    const examAnswers = req.body.answers;
    Exam.findOne({exam_id:examID},function(err,exam){
        if(err){

        }
        else{
            const sub = new Submission({
                student_id: studentID,
                exam_id: examID,
                answers: examsAnswers,
                score: 0
            })
            sub.save();
        }
    });
    
})


app.get('/api/hello', (req, res) => {
res.send({first:"Gianna",last:"Torpey"});
});

app.post("/getscores", (req, res) => {
    const studentID = "123";
    Submission.find({id: studentID},function (err,submissions){
        if (err){
            console.log(err)
        }
        else {
            res.send({studentSubs: submissions});
        }
    });
});

app.post("/getexam", (req, res) => {
    const examID = "geo1";
    Exam.find({exam_id: examID}, function(err,exams){
        if (err){
            console.log(err)
        }
        else {
            res.send({examsQuestions: exams[0].questionsArray});
        }
    });
});




app.listen(port, () => console.log(`Listening on port ${port}`));
