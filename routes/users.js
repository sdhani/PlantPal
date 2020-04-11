/* routes/users.js */
const Router = require("express").Router();
const queries = require('../controllers/users');


/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		queries.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});

module.exports = Router; /* export Router */

/**
 * 
(property) Response.json: (body?: any) => Response
Send JSON response.

Examples:

 res.json(null);
 res.json({ user: 'tj' });
 res.status(500).json('oh noes!');
 res.status(404).json('I dont have that');
 */