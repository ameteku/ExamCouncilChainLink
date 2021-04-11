const mongoose = require("mongoose");
const markersSchema = new mongoose.Schema({
    marker_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    exam_id: String,
    pw: String
});

module.exports = mongoose.model("marker", markersSchema);