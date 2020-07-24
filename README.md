# :seedling::sunflower:PlantPal

### A garden maintenance app where users can
- [x] Store a virtual garden list of both their indoor and outdoor plants (CRUD)
- [x] Sift through care tips for their particular plant. (via the Trefle API)
- [x] Get WEATHER and CARE indications for outdoor plants (via the OpenWeatherMap API)

## :tv: [DEMO](https://plant-pals.herokuapp.com)

### Contributors
- [@sdhani](https://github.com/sdhani) **`Backend Developer`**
- [@Marjan154](https://github.com/Marjan154) **`Frontend Developer`**
- [@anumhsn](https://github.com/anumhsn) **`Frontend Developer`**
- [@benevolentPreta](https://github.com/benevolentPreta) **`Heroku Schedule Jobs`**

### Install and Run
1. Clone this repository.
    ```
    HTTP: git clone https://github.com/sdhani/PlantPal.git
    SSH: git clone git@github.com:sdhani/PlantPal.git
    ``` 
1. Run `yarn install-all` in root directory.
1. Run `yarn start-all` in root directory.

### Running with a Local PostgreSQL DB
1. Create a local PostgreSQL DB (i.e. `createdb newDB`).
1. Create a .env file in the root directory, and add replace with your tokens.

    ```
    DATABASE_URL = "url-link-to-newDB"
    TREFLE_TOKEN = "your-trefle-token"
    OWEATHER_TOKEN = "your-open-weather-token"
    SECRET_JWT = "your-secret-jwt-key"
    OWEATHER_UNITS = "preference for units (imperial, metric, or kelvin (default))"
    ```
1. Add `require('dotenv').config();` to the top of your knexfile.js for development. `OPTIONAL`. 

### Set up your database tables relations. 
1. Run `knex migrate:latest` in the root directory 
(note: if knex command is not found, you can run `npx knex migrate:latest`).

### Seed your database. 
1. Run `knex seed:run` in the root directory (note: see above regarding npx).
1. Run `yarn start-all` in the root directory. 
1. Open `http://localhost:3000` in your browser to view seed data of all users.

## [Check Out PlantPal's RESTful API Docs](https://github.com/sdhani/PlantPal/blob/master/routes/RESTful_API_Docs.md)
# :tada:
