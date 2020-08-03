const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
    menu_name: String,
    menu_url: String,
    menu_icon: String,
    menu_title: String,
    menu_type: String
});

module.exports = mongoose.model('Menu', MenuSchema);