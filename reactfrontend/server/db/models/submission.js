const mongoose = require("mongoose");
const {Exam, examsSchema} = require("./exam");
const submissionSchema = new mongoose.Schema({
    student_id: String,
    exam: examsSchema,
    answers: Array,
    score: Number
});

module.exports = mongoose.model("submission", submissionSchema);