const Menu = require('../models/menu.model.js');

// Create and Save a new Menu
exports.create = (req, res) => {
    // Validate request
    if(!req.body.menu_name) {
        return res.status(400).send({
            message: "Menu content can not be empty"
        });
    }

    // Create a Menu
    const menu = new Menu({
        menu_name: req.body.menu_name,
        menu_url: req.body.menu_url,
        menu_icon: req.body.menu_icon,
        menu_title: req.body.menu_title,
        menu_type: req.body.menu_type
    });

    // Save Menu in the database
    menu.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the menu."
        });
    });
};

// Retrieve and return all menu from the database.
exports.findAll = (req, res) => {
    Menu.find()
    .then(menu => {
        res.send(menu);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving menu."
        });
    });
};

// Find a single menu with a menuId
exports.findOne = (req, res) => {
    Menu.findById(req.params.menuId)
    .then(menu => {
        if(!menu) {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });            
        }
        res.send(menu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving menu with id " + req.params.menuId
        });
    });
};

// Update a menu identified by the menuId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.menu_name) {
        return res.status(400).send({
            message: "menu content can not be empty"
        });
    }

    // Find menu and update it with the request body
    Menu.findByIdAndUpdate(req.params.menuId, {
        menu_name: req.body.menu_name,
        menu_url: req.body.menu_url,
        menu_icon: req.body.menu_icon,
        menu_title: req.body.menu_title,
        menu_type: req.body.menu_type
    }, {new: true})
    .then(menu => {
        if(!menu) {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });
        }
        res.send(menu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });                
        }
        return res.status(500).send({
            message: "Error updating menu with id " + req.params.menuId
        });
    });
};

// Delete a menu with the specified menuId in the request
exports.delete = (req, res) => {
    Menu.findByIdAndRemove(req.params.menuId)
    .then(menu => {
        if(!menu) {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });
        }
        res.send({message: "menu deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "menu not found with id " + req.params.menuId
            });                
        }
        return res.status(500).send({
            message: "Could not delete menu with id " + req.params.menuId
        });
    });
};
