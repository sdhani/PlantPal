/* routes/plants.js */
const Router = require("express").Router();
const db = require('../controllers/plants');


/* GET All gardens from a user */
Router.get("/", async (req, res) => {
  const { email } = req.body;
  console.log("HI THERE")
	try {
		db.getAllUserGardens(email).then(gardens => {
			res.status(200).json(gardens);
		});
	}
  catch(err) { console.log(err); }
});

module.exports = Router; /* export Router */
