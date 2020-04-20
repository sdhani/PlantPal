/* routes/gardens.js */

const Router = require("express").Router();
const db = require('../controllers/gardens');


/* GET all gardens from a user */
Router.get("/", async (req, res) => {
  const { id } = req.body;
	try {
		db.getAllUserGardens(id).then(gardens => {
			res.status(200).json(gardens);
		});
	}
  catch(err) { console.log(err); }
});


/* GET a specific garden from a user */
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


/* GET All plants from a garden */
Router.get("/:id/plants", async (req, res) => {
  const { user_id } = req.body;
  try {
		db.getAllPlantsFromGarden(user_id, req.params.id).then(plants => {
			res.status(200).json(plants);
		});
	}
  catch(err) { console.log(err); }
});


/* POST new garden */
Router.post("/", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('garden_name')) {
    return res.status(400).json({ error: 'you must supply a field "garden_name" when creating a new garden' });
  }

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when creating a new garden' });
  }

  const { garden_name, user_id } = body;
  
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


/* PUT garden */
Router.put("/:id", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('garden_name')) {
    return res.status(400).json({ error: 'you must supply a field "garden_name" when updating a new garden' });
  }

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a new garden' });
  }

  const { garden_name, user_id } = body;

  try {
    db.updateGardenByID(user_id, req.params.id, garden_name).then(
      res.status(200).json({success: true})
    );
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


/* DEL garden */
Router.delete("/:id/delete", async(req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a new garden' });
  }

  try {
    db.deleteGardenByID(user_id, req.params.id).then(
      res.status(200).json({success: true})
    );
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


module.exports = Router; /* export Router */
