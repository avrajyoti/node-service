const Branding = require('../models/branding.model.js');

// Create and Save a new Branding
exports.create = (req, res) => {
    // Validate request
    if(!req.body.branding_name) {
        return res.status(400).send({
            message: "Branding content can not be empty"
        });
    }

    // Create a Branding
    const branding = new Branding({
        branding_name: req.body.branding_name,
        branding_logo: req.body.branding_logo,
        branding_site: req.body.branding_site,
        branding_company: req.body.branding_company,
        branding_market_segment: req.body.branding_market_segment
    });

    // Save Branding in the database
    branding.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Branding."
        });
    });
};

// Retrieve and return all branding from the database.
exports.findAll = (req, res) => {
    Branding.find()
    .then(branding => {
        res.send(branding);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving branding."
        });
    });
};

// Find a single branding with a brandingId
exports.findOne = (req, res) => {
    Branding.findById(req.params.brandingId)
    .then(branding => {
        if(!branding) {
            return res.status(404).send({
                message: "branding not found with id " + req.params.brandingId
            });            
        }
        res.send(branding);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "branding not found with id " + req.params.brandingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving branding with id " + req.params.brandingId
        });
    });
};

// Update a branding identified by the brandingId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.branding_name) {
        return res.status(400).send({
            message: "Branding content can not be empty"
        });
    }

    // Find branding and update it with the request body
    Branding.findByIdAndUpdate(req.params.brandingId, {
        branding_name: req.body.branding_name,
        branding_logo: req.body.branding_logo,
        branding_site: req.body.branding_site,
        branding_company: req.body.branding_company,
        branding_market_segment: req.body.branding_market_segment
    }, {new: true})
    .then(branding => {
        if(!branding) {
            return res.status(404).send({
                message: "branding not found with id " + req.params.brandingId
            });
        }
        res.send(branding);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "branding not found with id " + req.params.brandingId
            });                
        }
        return res.status(500).send({
            message: "Error updating branding with id " + req.params.brandingId
        });
    });
};

// Delete a branding with the specified brandingId in the request
exports.delete = (req, res) => {
    Branding.findByIdAndRemove(req.params.brandingId)
    .then(branding => {
        if(!branding) {
            return res.status(404).send({
                message: "Branding not found with id " + req.params.brandingId
            });
        }
        res.send({message: "Branding deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Branding not found with id " + req.params.brandingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete branding with id " + req.params.brandingId
        });
    });
};
