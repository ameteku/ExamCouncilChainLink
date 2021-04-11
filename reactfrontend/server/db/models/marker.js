const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const markersSchema = new mongoose.Schema({
    marker_id: String,
    first_name: String,
    last_name: String,
    public_add: String,
    exam_id: String,
    pw: String
});

const secret = "This is our secret";
markersSchema.plugin(encrypt, {secret:secret, encryptedFields: ["pw"]});
module.exports = mongoose.model("marker", markersSchema);