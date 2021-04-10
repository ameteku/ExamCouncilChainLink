const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/studentsDB",{ useUnifiedTopology: true, useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    examsArray: Array,
    pw: String,
    photos: String
});

const markersSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
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
    score: String
});


const Student = mongoose.model("Student", studentSchema);
const student1 = new Student({
    id: "123",
    first_name: "Ebo",
    last_name: "Dennis",
    public_add: "0x12",
    examsArray: ["Chem","Bio"],
    pw: "myNameIsEbo",
    photos: "image.jpg"
});

const student2 = new Student({
    id: "133",
    first_name: "Gianna",
    last_name: "Torpey",
    public_add: "0x11",
    examsArray: ["Chem"],
    pw: "myNameIsEbo",
    photos: "image2.jpg"
});

//student1.save();
Student.insertMany([student1, student2], function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Success");
    }
});

Student.find(function(err, students){
    if (err){
      console.log(err);
    }
    else {
      mongoose.connection.close();
      //console.log(students)
      students.forEach(element => console.log(element.first_name));
    }
  })
