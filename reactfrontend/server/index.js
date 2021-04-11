const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/testexamcouncilDB",{ useUnifiedTopology: true, useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    student_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    examsArray: Array,
    pw: String,
    photos: String
});

const markersSchema = new mongoose.Schema({
    marker_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    exam_id: String,
    pw: String
});

const examsSchema = new mongoose.Schema({
    exam_id: String,
    questionsArray: Array,
    exam_name: String
});

const submissionSchema = new mongoose.Schema({
    student_id: String,
    exam_id: String,
    answers: Array,
    score: Number
});

const Student = mongoose.model("Student", studentSchema);
const Marker = mongoose.model("Marker", markersSchema);
const Exam = mongoose.model("Exam", examsSchema);
const Submission = mongoose.model("Submission", submissionSchema);



app.post('/getexamsforstudent', (req, res) => {
    const studentID = req.body.studentID;
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
})

app.get('/api/hello', (req, res) => {
res.send({first:"Gianna",last:"Torpey"});
});

app.get("/getscores", (req, res) => {
    const studentID = "123";
})

app.get("/getexam", (req, res) => {
    const examID = "123";
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
