/* routes/plants.js */
const Router = require("express").Router();
const axios = require("axios");
const db = require('../controllers/plants');
const TREFLE_API = "http://trefle.io/api/plants"
const TREFLE_TOKEN = process.env.TREFLE_TOKEN;


/* Get all plants from a user */
Router.get("/", async (req, res) => {
  const { user_id } = req.body;
  try {
		db.getAllPlantsFromUser(user_id).then(plants => {
      if(plants.length > 0){
        res.status(200).json(plants)
      } else {
        res.status(200).send("User does not have any plants.")
      }
		});
	}
  catch(err) { console.log(err); }
});


/* 
  QUERY a plant from the Trefle API 
  Use the "id" field of a selected plant from query to add plant via post.  
*/
Router.get("/query", async (req, res) => {
  const { body } = req;
  if (!body.hasOwnProperty('plant_query')) {
    return res.status(400).json({ error: 'you must supply a field "plant_query" when adding a new plant' });
  }

  const { plant_query } = body;
  try {
    const response = await axios.get(`${TREFLE_API}/?q=${plant_query}&complete_data=true&token=${TREFLE_TOKEN}`);
    res.status(200).json(response.data);    
  }
  catch(err) { console.log(err); }
});


/* Get a specific garden from a user */
Router.get("/:id", async (req, res) => {
  const { user_id } = req.body;
  try {
    db.getPlantByID(user_id, req.params.id).then(plant => {
      if(plant.length > 0){
        res.status(200).json(plant)
      } else {
        res.status(200).send("Plant does not exist in user's garden.")
      }
    });
  }
  catch(err) { console.log(err); }
});


/* 
  Add a new plant 
  Needs the `trefle_id` from GET query ^^ to add Trefle Plant.
*/
Router.post("/", async (req, res) => {
  const { trefle_id, garden_id, user_id, common_name, outdoor_plant } = req.body;
  if (!req.body.hasOwnProperty('garden_id') || typeof garden_id !== 'number') { /* checks */
    return res.status(400).json({ error: 'you must supply a field "garden_id" when adding a new plant' });
  }

  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'number') { /* checks */
    return res.status(400).json({ error: 'you must supply a field "user_id" when adding a new plant' });
  } 
  
  if (!req.body.hasOwnProperty('outdoor_plant') || typeof outdoor_plant !== 'boolean') { /* checks */
    return res.status(400).json({ error: 'you must supply a field "outdoor_plant" when adding a new plant' });
  }

  /* Manually add plant to db */
  if(!req.body.hasOwnProperty('trefle_id') || typeof trefle_id !== 'number'){ /* trefle_id not provided */
    if (!res.body.hasOwnProperty('common_name') || typeof common_name !== 'string') {
      return res.status(400).json({ error: 'you must supply a field "common_name" when adding a new plant' });
    }
  
    try {
      db.addPlant(garden_id, user_id, common_name, outdoor_plant).then(res.status(200).json({success: true}))
    }
    catch (err) { res.status(500).json({ error: 'Failed to add plant manually.' }); }

  } else { /* Add Plant Entry from Trefle Query select */
    try {
      const newPlant = await axios.get(`${TREFLE_API}/${trefle_id}/?token=${TREFLE_TOKEN}`);
      const { 
        common_name, 
        scientific_name, duration,
        outdoor_plant, 
        family_common_name 
      } = newPlant.data;

      const { 
        images, 
        foliage, 
        growth, 
        fruit_or_seed, 
        seed, 
        specifications 
      } = newPlant.data.main_species;
      
      const images_json = JSON.stringify(images);
      const foliage_json = JSON.stringify(foliage);
      const growth_json = JSON.stringify(growth);
      const fruit_or_seed_json = JSON.stringify(fruit_or_seed);
      const seed_json = JSON.stringify(seed);
      const specifications_json = JSON.stringify(specifications);

      db.addPlant(outdoor_plant, garden_id, user_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, 
        images_json, foliage_json, fruit_or_seed_json, growth_json, seed_json, specifications_json, family_common_name )
        .then(res.status(200).json({success: true}))
    }
    catch (err) { res.status(500).json({ error: 'something weird happened with the API.' }); }
  }
});


/* Update plant /:id */
Router.put("/:id", async (req, res) => {
  const { garden_id, outdoor_plant, user_id, images, last_watered } = req.body;
  if (!req.body.hasOwnProperty('user_id') || typeof trefle_id !== 'number') {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a plants info' });
  }

  if (!req.body.hasOwnProperty('garden_id') || typeof trefle_id !== 'number') {
    return res.status(400).json({ error: 'you must supply a field "garden_id" when updating a plants info' });
  }

  if (!req.body.hasOwnProperty('outdoor_plant') || typeof trefle_id !== 'boolean') {
    return res.status(400).json({ error: 'you must supply a field "outdoor_plant" when updating a plants info' });
  }

  if (!req.body.hasOwnProperty('last_watered') || typeof last_watered !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "last_watered" of type "yyyy-mm-dd" when updating a plants info' });
  }
  
  try {
    db.updatePlant(req.params.id, garden_id, outdoor_plant, user_id, images, last_watered)
    .then(res.status(200).json({success: true}));
  }
  catch(err) { res.status(500).json({ error: 'something weird happened with the API.' }); }
});


/* Delete plant :id */
Router.delete("/:id/delete", async(req, res) => {
  const { user_id } = req.body;
  if (!req.body.hasOwnProperty('user_id') || typeof user_id !== 'number') {
    return res.status(400).json({ error: 'you must supply a field "user_id" when deleting a plants info' });
  }
  try {
    db.deletePlant(user_id, req.params.id).then(res.status(200).json({success: true}));
  }
  catch(err) { res.status(500).json({ error: 'something weird happened with the API.' }); }
});


module.exports = Router; /* export Router */
