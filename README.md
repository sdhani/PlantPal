# PlantPal

### A garden maintenance app where users can
- Store a virtual garden list of both their indoor and outdoor plants (CRUD)
- Sift through care tips for their particular plant. (via the Trefle API)
- Get WEATHER and CARE indications for outdoor plants (via the OpenWeatherMap API)

--- 

## Install and Run

1. Clone Repo.
    - SSH: `git clone git@github.com:sdhani/PlantPal.git` 
    - HTTP: `git clone https://github.com/sdhani/PlantPal.git`

1. Run `yarn install-all` in root directory.
1. In the root directory of the project, run `yarn start-all`.

### To Run with a PostgreSQL DB

1. Create a PostgreSQL DB. (i.e. `createdb newDB`)
1. Create a .env file in the `server` directory.
1. Add your `DATABASE_URL = "url-link-to-newDB"` to the .env file.
1. In the root directory of the project,  `knex migrate:latest`.
1. Next run `knex seed:run`.
1. Finally `yarn start`. (`http://localhost:3000/` should display the dummy usernames in your newDB database).

### Troubleshooting

1. Check your newDB database. Do you have the `users` table?
1. Is your `users` table empty? (Run `select * from users;`)

---

## Entity Relationship Diagrams
Dummy user table.

### users
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK  | id | serial | 
|   | username | text not null |

---
