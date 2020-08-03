module.exports = (app) => {
    const company = require('../controllers/company.controller.js');

    // Create a new company
    app.post('/company', company.create);

    // Retrieve all company
    app.get('/company', company.findAll);

    // Retrieve a single Company with companyId
    app.get('/company/:companyId', company.findOne);

    // Update a Company with companyId
    app.put('/company/:companyId', company.update);

    // Delete a Company with companyId
    app.delete('/company/:companyId', company.delete);
}