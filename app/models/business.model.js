const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
    person_name: String,
    business_name: String,
    business_gst_number: String
});

module.exports = mongoose.model('Business', BusinessSchema);