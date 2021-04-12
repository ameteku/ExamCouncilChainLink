const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
    student_id: String,
    exam_id: String,
    answers: Array,
    score: Number
});

module.exports = mongoose.model("submission", submissionSchema);