const mongoose = require("mongoose");
const examsSchema = new mongoose.Schema({
    exam_id: String,
    questionsArray: Array,
    exam_name: String
});

const model = mongoose.model("exam", examsSchema); 
module.exports = {model,examsSchema};