module.exports = (app) => {
    const branding = require('../controllers/branding.controller.js');

    // Create a new branding
    app.post('/branding', branding.create);

    // Retrieve all branding
    app.get('/branding', branding.findAll);

    // Retrieve a single Branding with brandingId
    app.get('/branding/:brandingId', branding.findOne);

    // Update a Branding with brandingId
    app.put('/branding/:brandingId', branding.update);

    // Delete a Branding with brandingId
    app.delete('/branding/:brandingId', branding.delete);
}