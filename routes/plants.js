/* routes/plants.js */
const Router = require("express").Router();
const axios = require("axios");
const db = require('../controllers/plants');
const TREFLE_API = "http://trefle.io/api/plants"
const TREFLE_TOKEN = process.env.TREFLE_TOKEN;


/* GET All plants from a user */
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
  Use the "id" field in the response of a plant entry to add plant.  
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


/* GET a specific garden from a user */
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
  POST a new plant 
  Needs the `trefle_id` from GET query ^^ to add Trefle Plant.
*/
Router.post("/", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('garden_id')) { /* checks */
    return res.status(400).json({ error: 'you must supply a field "garden_id" when adding a new plant' });
  }

  if (!body.hasOwnProperty('user_id')) { /* checks */
    return res.status(400).json({ error: 'you must supply a field "user_id" when adding a new plant' });
  } 
  
  if (!body.hasOwnProperty('outdoor_plant')) { /* checks */
    return res.status(400).json({ error: 'you must supply a field "outdoor_plant" when adding a new plant' });
  }

  if(!body.hasOwnProperty('trefle_id')){ /* trefle_id not provided */
    if (!body.hasOwnProperty('common_name')) {
      return res.status(400).json({ error: 'you must supply a field "common_name" when adding a new plant' });
    }
  
    const { garden_id, user_id, common_name, outdoor_plant } = body;
    try {
      db.addPlant(garden_id, user_id, common_name, outdoor_plant)
        .then(res.status(200).json({success: true}))
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'something weird happened with the API.' });
    }

  } else { /* Add Plant Entry from Trefle */
    
    const { trefle_id, garden_id, user_id } = body;
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
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'something weird happened with the API.' });
    }
  }
});


/* PUT plant */
Router.put("/:id", async (req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when updating a plants info' });
  }

  if (!body.hasOwnProperty('garden_id')) {
    return res.status(400).json({ error: 'you must supply a field "garden_id" when updating a plants info' });
  }

  if (!body.hasOwnProperty('outdoor_plant')) {
    return res.status(400).json({ error: 'you must supply a field "outdoor_plant" when updating a plants info' });
  }

  const { garden_id, outdoor_plant, user_id, images } = body;
  try {
    db.updatePlant(req.params.id, garden_id, outdoor_plant, user_id, images).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


/* DEL plant */
Router.delete("/:id/delete", async(req, res) => {
  const { body } = req;

  if (!body.hasOwnProperty('user_id')) {
    return res.status(400).json({ error: 'you must supply a field "user_id" when deleting a plants info' });
  }

  const { user_id } = body;
  try {
    db.deletePlant(user_id, req.params.id).then(
      res.status(200).json({success: true})
    );
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'something weird happened with the API.' });
  }
});


module.exports = Router; /* export Router */
