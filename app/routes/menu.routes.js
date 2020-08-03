module.exports = (app) => {
    const menu = require('../controllers/menu.controller.js');

    // Create a new menu
    app.post('/menu', menu.create);

    // Retrieve all menu
    app.get('/menu', menu.findAll);

    // Retrieve a single menu with menuId
    app.get('/menu/:menuId', menu.findOne);

    // Update a menu with menuId
    app.put('/menu/:menuId', menu.update);

    // Delete a menu with menuId
    app.delete('/menu/:menuId', menu.delete);
}