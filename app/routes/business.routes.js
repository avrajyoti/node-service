module.exports = (app) => {
    const business = require('../controllers/business.controller.js');

    // Create a new Business
    app.post('/business', business.create);

    // Retrieve all Business
    app.get('/business', business.findAll);

    // Retrieve a single Business with businessId
    app.get('/business/:businessId', business.findOne);

    // Update a Business with businessId
    app.put('/business/:businessId', business.update);

    // Delete a Business with businessId
    app.delete('/business/:businessId', business.delete);
}