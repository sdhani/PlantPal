/* api/users.js */
const Router = require("express").Router();
const userQueries = require('../database/users');


/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		userQueries.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});

module.exports = Router; /* export Router */