/* routes/gardens.js */
const Router = require("express").Router();
const db = require('../controllers/gardens');


/* Get all gardens from a user */
Router.get("/", async (req, res) => {
  const { id } = req.body;
	try {
		db.getAllUserGardens(id).then(gardens => {
			res.status(200).json(gardens);
		});
	}
  catch(err) { console.log(err); }
});


/* Get a specific garden from a user */
Router.get("/:id", async (req, res) => {
  const { user_id } = req.body;
  try {
    db.getGardenByID(user_id, req.params.id).then(garden => {
      if(garden.length > 0){
        res.status(200).json(garden)
      } else {
        res.status(200).send("Invalid garden. User does not own garden.")
      }
    });
  }
  catch(err) { console.log(err); }
});


/* Get all plants from garden /:id */
Router.get("/:id/plants", async (req, res) => {
  const { user_id } = req.body;
  try {
		db.getAllPlantsFromGarden(user_id, req.params.id).then(plants => {
			res.status(200).json(plants);
		});
	}
  catch(err) { console.log(err); }
});


/* Add new garden */
Router.post("/", async (req, res) => {
  const { garden_name, user_id }  = req.body;

  if (!req.body.hasOwnProperty('garden_name') || typeof garden_name !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "garden_name" of type string when creating a new garden' });
  }

  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "user_id" of type string when creating a new garden' });
  }

  try {
    db.createGarden(garden_name, user_id).then(
      res.status(200).json({success: true})
    )
	}
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to add new garden. 500 Error.' });
  }
});


/* Update garden */
Router.put("/:id", async (req, res) => {
  const { garden_name, user_id } = req.body;

  if (!req.body.hasOwnProperty('garden_name') || typeof garden_name !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "garden_name" when updating a new garden' });
  }

  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a new garden' });
  }

  try {
    db.updateGardenByID(user_id, req.params.id, garden_name).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: `Unable to update garden ${garden_name}.` });
  }
});


/* Delete garden */
Router.delete("/:id/delete", async(req, res) => {
  const { user_id } = req.body;

  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a new garden' });
  }

  try {
    db.deleteGardenByID(user_id, req.params.id).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


module.exports = Router; /* export Router */
