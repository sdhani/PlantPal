/* routes/users.js */
const Router = require("express").Router();
const db = require('../controllers/users');
const VerifyToken = require('./verifyToken');


/* Get all users */
Router.get("/", async (req, res) => {
	try {
		db.getAllUsers().then(users => {
			res.status(200).json(users);
		});
	}
  catch(err) { res.status(500).json({ error: 'Unable to get all user.' });  }
});


/* Update a user */
Router.put("/", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const { email, display_name, zipcode, password } = req.body;
  try {
    const id = user_id;
		db.updateUser(id, email, display_name, zipcode, password)
		.then(res.status(200).json({success: true}))
	}
  catch (err) { res.status(500).json({ error: 'Unable to update user.' }); }
});


/* Delete user */
Router.delete("/delete", VerifyToken, async(req, res) => {
  const { user_id } = req;

  if (user_id === undefined) {
    return res.status(400).json({ error: 'User not authorized to perform action.' });
  }

  try {
    db.deleteUser(user_id).then(res.status(200).json({success: true}));
  }
  catch (err) { res.status(500).json({ error: 'Unable to delete user.' }); }
});


module.exports = Router; /* export Router */
