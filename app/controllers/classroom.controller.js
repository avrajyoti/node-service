const Classroom = require('../models/classroom.model.js');

// Create and Save a new Classroom
exports.create = (req, res) => {
    // Validate request
    if(!req.body.class_name) {
        return res.status(400).send({
            message: "Classroom content can not be empty"
        });
    }

    // Create a Classroom
    const classroom = new Classroom({
        class_name: req.body.class_name,
        students: req.body.students
    });

    // Save Classroom in the database
    classroom.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the classroom."
        });
    });
};

// Retrieve and return all classroom from the database.
exports.findAll = (req, res) => {
    Classroom.find()
    .then(classroom => {
        res.send(classroom);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving classroom."
        });
    });
};

// Find a single classroom with a classroomId
exports.findOne = (req, res) => {
    Classroom.findById(req.params.classroomId)
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "classroom not found with id " + req.params.classroomId
            });            
        }
        res.send(classroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "classroom not found with id " + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving classroom with id " + req.params.classroomId
        });
    });
};

// Update a classroom identified by the classroomId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.class_name) {
        return res.status(400).send({
            message: "classroom content can not be empty"
        });
    }

    // Find classroom and update it with the request body
    Classroom.findByIdAndUpdate(req.params.classroomId, {
        class_name: req.body.class_name,
        students: req.body.students
    }, {new: true})
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "classroom not found with id " + req.params.classroomId
            });
        }
        res.send(classroom);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "classroom not found with id " + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Error updating classroom with id " + req.params.classroomId
        });
    });
};

// Delete a classroom with the specified classroomId in the request
exports.delete = (req, res) => {
    Classroom.findByIdAndRemove(req.params.classroomId)
    .then(classroom => {
        if(!classroom) {
            return res.status(404).send({
                message: "Classroom not found with id " + req.params.classroomId
            });
        }
        res.send({message: "Classroom deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Classroom not found with id " + req.params.classroomId
            });                
        }
        return res.status(500).send({
            message: "Could not delete classroom with id " + req.params.classroomId
        });
    });
};
