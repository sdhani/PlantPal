/* routes/plants.js */
const Router = require("express").Router();
const db = require('../controllers/gardens');


/* GET All gardens from a user */
Router.get("/", async (req, res) => {
  const { id } = req.body;
	try {
		db.getAllUserGardens(id).then(gardens => {
			res.status(200).json(gardens);
		});
	}
  catch(err) { console.log(err); }
});

/* GET a specific garden (of plants) from a user */
Router.get("/:id", async (req, res) => {
  // const { garden_id } = req.body;

  try {
    db.getPlantsFromGarden(req.params.id).then(plants => {
      res.status(200).json(plants);
    })
  }
  catch(err) { console.log(err); }
});

/* Create new garden */
Router.post("/", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('garden_name')) {
    return res.status(400).json({ error: 'you must supply a field "garden_name" when creating a new garden' });
  }

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when creating a new garden' });
  }

  const { garden_name, user_id } = body;
  
  console.log("passed checks")
  try {
    db.createGarden(garden_name, user_id).then(
      res.status(200).json({success: true})
    )

	}
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


module.exports = Router; /* export Router */
