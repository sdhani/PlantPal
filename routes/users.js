/* routes/users.js */
const Router = require("express").Router();
const queries = require('../controllers/users');
// const db = require('../controllers/users')

/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		queries.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});

// POST to users
Router.post("/", async(req,res) => {
	
// console.log(req.body);
// res.send('hello');
 }); 

module.exports = Router; /* export Router */
