const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    student_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    examsArray: Array,
    pw: String,
    photos: String
});

module.exports = mongoose.model("student", studentSchema);