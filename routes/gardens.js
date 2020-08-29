/* routes/gardens.js */
const Router = require("express").Router();
const db = require('../controllers/gardens');
const VerifyToken = require('./verifyToken');


/* Get all gardens from a user */
Router.get("/", VerifyToken, async (req, res) => {
  const { user_id } = req;

	try {
		await db.getAllUserGardens(user_id).then(gardens => {
			res.status(200).json(gardens);
		});
	}
  catch(err) { res.status(500).json({ error: 'Unable to get all gardens. 500 Error.' }); }
});


/* Get a specific garden from a user */
Router.get("/:id", VerifyToken, async (req, res) => {
  const { user_id } = req;

  try {
    await db.getGardenByID(user_id, req.params.id).then(garden => {
      if(garden.length > 0){
        res.status(200).json(garden);
      } else {
        res.status(200).json({ error: 'Invalid garden. User does not own garden.'});
      }
    });
  }
  catch(err) { res.status(500).json({ error: 'Unable to get garden. 500 Error.' }); }
});


/* Get all plants from garden /:id */
Router.get("/:id/plants", VerifyToken, async (req, res) => {
  const { user_id } = req;

  try {
		await db.getAllPlantsFromGarden(user_id, req.params.id).then(plants => {
			res.status(200).json(plants);
		});
	}
  catch(err) { res.status(500).json({ error: 'Unable to get all plants from garden. 500 Error.' }); }
});


/* Add new garden */
Router.post("/", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const { garden_name }  = req.body;

  if (!req.body.hasOwnProperty('garden_name') || typeof garden_name !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "garden_name" of type string when creating a new garden' });
  }

  try {
    await db.createGarden(garden_name, user_id).then(
      res.status(200).json({success: true})
    )
	}
  catch (err) { res.status(500).json({ error: 'Unable to add new garden. 500 Error.' }); }
});


/* Update garden */
Router.put("/:id", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const { garden_name } = req.body;

  if (!req.body.hasOwnProperty('garden_name') || typeof garden_name !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "garden_name" when updating a new garden' });
  }

  try {
    await db.updateGardenByID(user_id, req.params.id, garden_name).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) { res.status(500).json({ error: `Unable to update garden ${garden_name}.` }); }
});


/* Delete garden */
Router.delete("/:id/delete", VerifyToken, async(req, res) => {
  const { user_id } = req;

  try {
    await db.deleteGardenByID(user_id, req.params.id).then(res.status(200).json({success: true}));
  }
  catch (err) { res.status(500).json({ error: 'Failed to delete garden.' }); }
});


module.exports = Router; /* export Router */
