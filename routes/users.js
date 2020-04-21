/* routes/users.js */
const Router = require("express").Router();
const db = require('../controllers/users');


/* GET all users  */
Router.get("/", async (req, res) => {
	try {
		db.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});


/* Register a user */
Router.post("/", async (req, res) => {
	const { body } = req;
	
  if (!body.hasOwnProperty('email')) {
    return res.status(400).json({ error: 'you must supply a field "email" when creating a new garden' });
  }

  const { email, display_name, zipcode, password } = body;
  try {
    db.registerUser(email, display_name, zipcode, password).then(res.status(200).json({success: true}))
	}
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


/* Update a user */
Router.put("/:id", async (req, res) => {
	const { body } = req;
	
  const { email, display_name, zipcode, password } = body;
  try {
		db.updateUser(req.params.id, email, display_name, zipcode, password)
		.then(res.status(200).json({success: true}))
	}
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


/* DEL user */
Router.delete("/:id/delete", async(req, res) => {
  try {
    db.deleteUser(req.params.id).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


module.exports = Router; /* export Router */
