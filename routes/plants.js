/* routes/plants.js */

const Router = require("express").Router();
const db = require('../controllers/plants');


/* GET All plants from a garden */
Router.get("/:id", async (req, res) => {
  const { user_id } = req.body;
  
  try {
		db.getAllPlantsFromGarden(user_id, req.params.id).then(plants => {
			res.status(200).json(plants);
		});
	}
  catch(err) { console.log(err); }
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

// /* Create new garden */
// Router.post("/", async (req, res) => {
//   const { body } = req;

//   if (!body.hasOwnProperty('garden_name')) {
//     return res.status(400).json({ error: 'you must supply a field "garden_name" when creating a new garden' });
//   }

//   if (!body.hasOwnProperty('user_id')) {
//     return res.status(400).json({ error: 'you must supply a field "user_id" when creating a new garden' });
//   }

//   const { garden_name, user_id } = body;
  
//   console.log("passed checks")
//   try {
//     const newGardenId = await db.createGarden(garden_name, user_id)

   
// 	}
//   catch (e) {
//     console.error(e);
//     res.status(500).json({ error: 'something weird happened with the API.' });
//   }
// });


module.exports = Router; /* export Router */
