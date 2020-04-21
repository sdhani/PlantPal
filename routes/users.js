/* routes/users.js */
const Router = require("express").Router();
const db = require('../controllers/users');


/* Get all users */
Router.get("/", async (req, res) => {
	try {
		db.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { console.log(err); }
});


/* Update a user */
Router.put("/:id", async (req, res) => {
  const { email, display_name, zipcode, password } = req.body;
  try {
		db.updateUser(req.params.id, email, display_name, zipcode, password)
		.then(res.status(200).json({success: true}))
	}
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update user.' });
  }
});


/* Delete user */
Router.delete("/delete", async(req, res) => {
  const { user_id } = req.body;
  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'number') {
    return res.status(400).json({ error: 'you must supply a field "user_id" when creating a new user' });
  }

  try {
    db.deleteUser(user_id).then(res.status(200).json({success: true}));
  }
  catch (err) { res.status(500).json({ error: 'Unable to delete user.' }); }
});


module.exports = Router; /* export Router */
