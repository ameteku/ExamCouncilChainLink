const mongoose = require("mongoose");
const examsSchema = new mongoose.Schema({
    exam_id: String,
    questionsArray: Array,
    exam_name: String
});

module.exports = mongoose.model("exam", examsSchema); 