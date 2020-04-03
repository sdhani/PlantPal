# PlantPal

### A garden maintenance app where users can
- Store a virtual garden list of both their indoor and outdoor plants (CRUD)
- Sift through care tips for their particular plant. (via the Trefle API)
- Get WEATHER and CARE indications for outdoor plants (via the OpenWeatherMap API)

--- 

## Entity Relationship Diagrams

---

## Install and Run

1. Clone Repo.
    - SSH: `git clone git@github.com:sdhani/PlantPal.git` 
    - HTTP: `git clone `
2. Run `yarn install` in root directory.
3. `cd client`
4. Run `yarn install`.
5. `cd ../server`
6. Run `yarn install`.
7. `cd ..`
8. In the root directory of the project, run `yarn start`.

#### To Run with a PostgreSQL DB

1. Create a PostgreSQL DB. (i.e. `createdb newDB`)
2. Create a .env file in the `server` directory.
3. Add your `DATABASE_URL = "url-link-to-newDB"` to the .env file. (Feel free to add a `PORT= #ofLocalPort` too.)
4. In the root directory of the project,  `knex migrate:latest`.
5. Next run `knex seed:run`.
6. Finally `yarn start`. (`http://localhost:3000/` should display the dummy usernames in your newDB database).

#### Troubleshooting

1. Check your newDB database. Do you have the `users` table?
2. Is your `users` table empty? (Run `select * from users;`)


