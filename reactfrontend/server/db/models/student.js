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

module.exports = mongoose.model("student", UserSchema);