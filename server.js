const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Allow access origin calls
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Common Node Server Application"});
});

require('./app/routes/business.routes.js')(app);
require('./app/routes/note.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/company.routes.js')(app);
require('./app/routes/employee.routes.js')(app);
require('./app/routes/branding.routes.js')(app);
require('./app/routes/classroom.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/menu.routes.js')(app);

// listen for requests
app.listen(9000, () => {
    console.log("Server is listening on port 9000");
});