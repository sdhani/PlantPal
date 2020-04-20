/* routes/plants.js */

const Router = require("express").Router();
const db = require('../controllers/plants');


/* GET All plants from a user */
Router.get("/", async (req, res) => {
  const { user_id } = req.body;
  
  try {
		db.getAllPlantsFromUser(user_id).then(plants => {
			res.status(200).json(plants);
		});
	}
  catch(err) { console.log(err); }
});


/* POST a new plant */
Router.post("/", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('garden_id')) {
    return res.status(400).json({ error: 'you must supply a field "garden_id" when creating a new garden' });
  }

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when creating a new garden' });
  }

  const { garden_id, user_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, images, 
    foliage, fruit_or_seed, growth, seed, specifications, family_common_name } = body;
  
  try {
    db.createGarden(garden_id, user_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, 
      images, foliage, fruit_or_seed, growth, seed, specifications, family_common_name )
      .then(res.status(200).json({success: true}))

	}
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


/* PUT plant */
Router.put("/:id", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a new garden' });
  }

  if (!body.hasOwnProperty('garden_id')) {
    return res.status(400).json({ error: 'you must supply a field "garden_id" when updating a new garden' });
  }

  if (!body.hasOwnProperty('outdoor_plant')) {
    return res.status(400).json({ error: 'you must supply a field "outdoor_plant" when updating a new garden' });
  }

  const { garden_id, outdoor_plant, user_id, images } = body;

  try {
    db.updatePlant(req.params.id, garden_id, outdoor_plant, user_id, images).then(
      res.status(200).json({success: true})
    );
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }

});


// /* GET a specific garden (of plants) from a user */
// Router.get("/:id", async (req, res) => {
//   // const { garden_id } = req.body;

//   try {
//     db.getPlantsFromGarden(req.params.id).then(plants => {
//       res.status(200).json(plants);getAllPlantsFromGarden(user_id, garden_id)
//     })
//   }
//   catch(err) { console.log(err); }
// });


module.exports = Router; /* export Router */
