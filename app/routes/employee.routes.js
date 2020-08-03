module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new employee
    app.post('/employee', employee.create);

    // Retrieve all employee
    app.get('/employee', employee.findAll);

    // Retrieve a single Employee with employeeId
    app.get('/employee/:employeeId', employee.findOne);

    // Update a Employee with employeeId
    app.put('/employee/:employeeId', employee.update);

    // Delete a Employee with employeeId
    app.delete('/employee/:employeeId', employee.delete);
}