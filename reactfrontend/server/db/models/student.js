const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const studentSchema = new mongoose.Schema({
    student_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    examsArray: Array,
    pw: String,
    photos: String
});

const secret = "This is our secret";
studentSchema.plugin(encrypt, {secret:secret, encryptedFields: ["pw"]});

module.exports = mongoose.model("student", studentSchema);