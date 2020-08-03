const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    employee_name: String,
    employee_code: String,
    employee_mobile: Number,
    employee_address: String,
    employee_designation: String,
    employee_experience: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);