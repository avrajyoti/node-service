const mongoose = require('mongoose');

const ClassroomSchema = mongoose.Schema({
    class_name: String,
    students: Array
});

module.exports = mongoose.model('Classroom', ClassroomSchema);