const mongoose = require('mongoose');

const BrandingSchema = mongoose.Schema({
    branding_name: String,
    branding_logo: String,
    branding_site: String,
    branding_company: String,
    branding_market_segment: String
});

module.exports = mongoose.model('Branding', BrandingSchema);