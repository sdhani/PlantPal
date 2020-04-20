/* routes/users.js */
const Router = require("express").Router();
const db = require('../controllers/users');


/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		db.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});

module.exports = Router; /* export Router */
