const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    company_name: String,
    company_emp_headcount: Number,
    company_site: String,
    company_revenue: String,
    company_address: String
});

module.exports = mongoose.model('Company', CompanySchema);