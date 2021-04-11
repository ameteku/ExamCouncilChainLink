const mongoose = require("mongoose");
const {Exam, examsSchema} = require("./exam");
const markersSchema = new mongoose.Schema({
    marker_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    exam: examsSchema,
    pw: String
});

module.exports = mongoose.model("marker", markersSchema);