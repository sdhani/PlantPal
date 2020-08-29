/* routes/plants.js */
const Router = require("express").Router();
const axios = require("axios");
const db = require("../controllers/plants");
const VerifyToken = require("./verifyToken");
const TREFLE_API = "http://trefle.io/api/plants";
const TREFLE_TOKEN = process.env.TREFLE_TOKEN;

/* Get all plants from a user */
Router.get("/", VerifyToken, async (req, res) => {
  const { user_id } = req;

  try {
    await db.getAllPlantsFromUser(user_id).then((plants) => {
      if (plants.length > 0) {
        res.status(200).json(plants);
      } else {
        res.status(200).json({ error: "User does not have any plants." });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve all user's plants" });
  }
});

Router.get("/priority", VerifyToken, async (req, res) => {
  const { user_id } = req;
  try {
    await db.getPriorityPlants(user_id).then((plants) => {
      if (plants.length > 0) {
        res.status(200).json(plants);
      } else {
        res.status(200).json({ error: "User does not have any plants." });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve all user's plants" });
  }
});

Router.get("/count", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const { type } = req.query;
  if (type === "outdoor") {
    try {
      await db.getPlantsCountOutdoor(user_id).then((plants) => {
        if (plants.length > 0) {
          res.status(200).json(plants);
        } else {
          res.status(200).json({ error: "User does not have any plants." });
        }
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve all user's plants" });
    }
  } else if (type === "indoor") {
    try {
      await db.getPlantsCountIndoor(user_id).then((plants) => {
        if (plants.length > 0) {
          res.status(200).json(plants);
        } else {
          res.status(200).json({ error: "User does not have any plants." });
        }
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve all user's plants" });
    }
  } else {
    try {
      await db.getPlantsCount(user_id).then((plants) => {
        if (plants.length > 0) {
          res.status(200).json(plants);
        } else {
          res.status(200).json({ error: "User does not have any plants." });
        }
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve all user's plants" });
    }
  }
});

/* 
  QUERY a plant from the Trefle API 
  Use the "id" field of a selected plant from query to add plant via post.  
*/
Router.get("/query", async (req, res) => {
  const { plant_query } = req.query;
  if (!req.query.hasOwnProperty("plant_query")) {
    return res.status(400).json({
      error: 'you must supply a field "plant_query" when adding a new plant',
    });
  }

  try {
    const response = await axios.get(
      `${TREFLE_API}/?q=${plant_query}&complete_data=true&token=${TREFLE_TOKEN}`
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong with this query." });
  }
});

/* Get a specific plant from a user */
Router.get("/:id", VerifyToken, async (req, res) => {
  const { user_id } = req;
  try {
    await db.getPlantByID(user_id, req.params.id).then((plant) => {
      if (plant.length > 0) {
        res.status(200).json(plant[0]);
      } else {
        res
          .status(200)
          .json({ error: "Plant does not exist in user's garden." });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get specific garden." });
  }
});

/* 
  Add a new plant 
  Needs the `trefle_id` from GET query ^^ to add Trefle Plant.
*/
Router.post("/", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const {
    trefle_id,
    garden_id,
    common_name,
    name,
    outdoor_plant,
    last_watered,
    days_until_needs_water,
  } = req.body;

  if (!req.body.hasOwnProperty("garden_id") || typeof garden_id !== "number") {
    /* checks */
    return res.status(400).json({
      error: 'you must supply a field "garden_id" when adding a new plant',
    });
  }

  if (
    !req.body.hasOwnProperty("outdoor_plant") ||
    typeof outdoor_plant !== "boolean"
  ) {
    /* checks */
    return res.status(400).json({
      error: 'you must supply a field "outdoor_plant" when adding a new plant',
    });
  }

  /* Manually add plant to db */
  if (!req.body.hasOwnProperty("trefle_id") || typeof trefle_id !== "number") {
    /* trefle_id not provided */
    if (
      !req.body.hasOwnProperty("common_name") ||
      typeof common_name !== "string"
    ) {
      return res.status(400).json({
        error: 'you must supply a field "common_name" when adding a new plant',
      });
    }

    try {
      await db.addPlant({
        garden_id,
        user_id,
        common_name,
        name,
        outdoor_plant,
        last_watered,
        days_until_needs_water,
      }).then(res.status(200).json({ success: true }));
    } catch (err) {
      res.status(500).json({ error: "Failed to add plant manually." });
    }
  } else {
    /* Add Plant Entry from Trefle Query select */
    try {
      const newPlant = await axios.get(
        `${TREFLE_API}/${trefle_id}/?token=${TREFLE_TOKEN}`
      );
      const {
        common_name,
        scientific_name,
        duration,
        family_common_name,
      } = newPlant.data;
      const {
        images,
        foliage,
        growth,
        fruit_or_seed,
        seed,
        specifications,
      } = newPlant.data.main_species;

      const images_json = JSON.stringify(images);
      const foliage_json = JSON.stringify(foliage);
      const growth_json = JSON.stringify(growth);
      const fruit_or_seed_json = JSON.stringify(fruit_or_seed);
      const seed_json = JSON.stringify(seed);
      const specifications_json = JSON.stringify(specifications);

      await db.addPlant({
        garden_id,
        user_id,
        common_name,
        name,
        scientific_name,
        trefle_id,
        duration,
        outdoor_plant,
        images_json,
        foliage_json,
        fruit_or_seed_json,
        growth_json,
        seed_json,
        specifications_json,
        family_common_name,
        last_watered,
        days_until_needs_water,
      }).then(res.status(200).json({ success: true }));
    } catch (err) {
      res.status(500).json({ error: "something weird happened with the API." });
    }
  }
});

/* Update plant /:id */
Router.put("/:id", VerifyToken, async (req, res) => {
  const { user_id } = req;
  const {
    garden_id,
    outdoor_plant,
    images,
    last_watered,
    common_name,
    name,
    days_until_needs_water,
  } = req.body;

  if (!req.body.hasOwnProperty("garden_id") || typeof garden_id !== "number") {
    return res.status(400).json({
      error: 'you must supply a field "garden_id" when updating a plants info',
    });
  }

  if (
    !req.body.hasOwnProperty("outdoor_plant") ||
    typeof outdoor_plant !== "boolean"
  ) {
    return res.status(400).json({
      error:
        'you must supply a field "outdoor_plant" when updating a plants info',
    });
  }

  if (
    !req.body.hasOwnProperty("last_watered") ||
    typeof last_watered !== "string"
  ) {
    return res.status(400).json({
      error:
        'you must supply a field "last_watered" of type "yyyy-mm-dd" when updating a plants info',
    });
  }

  try {
    await db.updatePlant(
      req.params.id,
      garden_id,
      outdoor_plant,
      user_id,
      images,
      last_watered,
      common_name,
      name,
      days_until_needs_water
    ).then(res.status(200).json({ success: true }));
  } catch (err) {
    res.status(500).json({ error: "Unable to update plant." });
  }
});

/* Delete plant :id */
Router.delete("/:id/delete", VerifyToken, async (req, res) => {
  const { user_id } = req;

  try {
    await db.deletePlant(user_id, req.params.id).then(
      res.status(200).json({ success: true })
    );
  } catch (err) {
    res.status(500).json({ error: "Unable to delete plant." });
  }
});

module.exports = Router; /* export Router */
