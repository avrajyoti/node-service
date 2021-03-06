const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if(!req.body.employee_name) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        employee_name: req.body.employee_name,
        employee_code: req.body.employee_code,
        employee_mobile: req.body.employee_mobile,
        employee_address: req.body.employee_address,
        employee_designation: req.body.employee_designation,
        employee_experience: req.body.employee_experience
    });

    // Save Employee in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    });
};

// Retrieve and return all employee from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employee => {
        res.send(employee);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employee."
        });
    });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.employeeId
        });
    });
};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.employee_name) {
        return res.status(400).send({
            message: "employee content can not be empty"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        employee_name: req.body.employee_name,
        employee_code: req.body.employee_code,
        employee_mobile: req.body.employee_mobile,
        employee_address: req.body.employee_address,
        employee_designation: req.body.employee_designation,
        employee_experience: req.body.employee_experience
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    });
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    });
};
