# :seedling::sunflower:PlantPal

### A garden maintenance app where users can
- Store a virtual garden list of both their indoor and outdoor plants (CRUD)
- Sift through care tips for their particular plant. (via the Trefle API)
- Get WEATHER and CARE indications for outdoor plants (via the OpenWeatherMap API)

***:tv: [Demo](https://plant-pals.herokuapp.com)***

## Install and Run

1. Clone this repository.
    
        HTTP: `git clone https://github.com/sdhani/PlantPal.git`
        SSH: `git clone git@github.com:sdhani/PlantPal.git` 
    
1. Run `yarn install-all` in root directory.
1. Run `yarn start-all` in root directory.

### Running with a Local PostgreSQL DB

1. Create a local PostgreSQL DB (i.e. `createdb newDB`).
1. Create a .env file in the root directory, or update env.sample with tokens and rename to ".env".
1. Add your `DATABASE_URL = "url-link-to-newDB"` to the .env file.
1. Add your `TREFLE_TOKEN = "your-trefle-token"` to the .env file.
1. Add your `OWEATHER_TOKEN = "your-open-weather-token"` to the .env file.
1. Add your `SECRET_JWT = "your-secret-jwt-key"` to the .env file.
1. Add `OWEATHER_UNITS = "preference for units (imperial, metric, or kelvin (default))"` to the .env file.
1. Add `require('dotenv').config();` to the top of your knexfile.js. 
1. Set up your database tables relations. Run `knex migrate:latest` in the root directory (note: if knex command is not found, you need to run `npx knex migrate:latest`).
1. Seed your database. Run `knex seed:run` in the root directory (note: see above regarding npx).
1. Run `yarn start-all` in the root directory. 
1. Open `http://localhost:3000` in your browser to view seed data of all users.

### [Check Out PlantPal's RESTful API Docs](https://github.com/sdhani/PlantPal/blob/master/routes/RESTful_API_Docs.md)

# :tada:
