// Setup empty JS object to act as endpoint for all routes
 projectData = {};

// Require Express to run server and routes
const express = require("express");
var path = require('path')
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8080;
const server = app.listen(port, function () {
	console.log(`Your server is running on local host: ${port}`);
})

//Send Project Data  
app.get("/projectData", function (req, res) {
	res.send(projectData);
});


//Receive Project Data 
app.post("/weather", sender)
	function sender(req, res) {
	console.log(req.body);
	 
		projectData.temp = req.body.temp
		projectData.date = req.body.date
		projectData.details = req.body.details
};

module.export = { sender }