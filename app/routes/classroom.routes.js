module.exports = (app) => {
    const classroom = require('../controllers/classroom.controller.js');

    // Create a new classroom
    app.post('/classroom', classroom.create);

    // Retrieve all classroom
    app.get('/classroom', classroom.findAll);

    // Retrieve a single Classroom with classroomId
    app.get('/classroom/:classroomId', classroom.findOne);

    // Update a Classroom with classroomId
    app.put('/classroom/:classroomId', classroom.update);

    // Delete a Classroom with classroomId
    app.delete('/classroom/:classroomId', classroom.delete);
}