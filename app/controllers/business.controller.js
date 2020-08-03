const Business = require('../models/business.model.js');

// Create and Save a new Business
exports.create = (req, res) => {
    // Validate request
    if(!req.body.person_name) {
        return res.status(400).send({
            message: "Business content can not be empty"
        });
    }

    // Create a Business
    const business = new Business({
        person_name: req.body.person_name,
        business_name: req.body.business_name,
        business_gst_number: req.body.business_gst_number
    });

    // Save Business in the database
    business.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Business."
        });
    });
};

// Retrieve and return all business from the database.
exports.findAll = (req, res) => {
    Business.find()
    .then(business => {
        res.send(business);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving business."
        });
    });
};

// Find a single business with a businessId
exports.findOne = (req, res) => {
    Business.findById(req.params.businessId)
    .then(business => {
        if(!business) {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });            
        }
        res.send(business);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving business with id " + req.params.businessId
        });
    });
};

// Update a business identified by the businessId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.person_name) {
        return res.status(400).send({
            message: "Business content can not be empty"
        });
    }

    // Find business and update it with the request body
    Business.findByIdAndUpdate(req.params.businessId, {
        person_name: req.body.person_name,
        business_name: req.body.business_name,
        business_gst_number: req.body.business_gst_number
    }, {new: true})
    .then(business => {
        if(!business) {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });
        }
        res.send(business);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });                
        }
        return res.status(500).send({
            message: "Error updating business with id " + req.params.businessId
        });
    });
};

// Delete a business with the specified businessId in the request
exports.delete = (req, res) => {
    Business.findByIdAndRemove(req.params.businessId)
    .then(business => {
        if(!business) {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });
        }
        res.send({message: "Business deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Business not found with id " + req.params.businessId
            });                
        }
        return res.status(500).send({
            message: "Could not delete business with id " + req.params.businessId
        });
    });
};
