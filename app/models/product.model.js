const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_name: String,
    product_price: Number,
    product_type: String,
    product_category: String,
    product_description: String
});

module.exports = mongoose.model('Product', ProductSchema);