# :seedling::sunflower:PlantPal

### A garden maintenance app where users can
- Store a virtual garden list of both their indoor and outdoor plants (CRUD)
- Sift through care tips for their particular plant. (via the Trefle API)
- Get WEATHER and CARE indications for outdoor plants (via the OpenWeatherMap API)

***:tv: [Demo link](https://plant-pals.herokuapp.com)***


## Install and Run

1. Clone this repository.
    
    HTTP: `git clone https://github.com/sdhani/PlantPal.git`
   
    SSH: `git clone git@github.com:sdhani/PlantPal.git` 
    
1. Run `yarn install-all` in root directory.
1. Run `yarn start-all` in root directory..

### Running with a Local PostgreSQL DB

1. Create a local PostgreSQL DB (i.e. `createdb newDB`)

1. Create a .env file in the `server` directory.

1. Add your `DATABASE_URL = "url-link-to-newDB"` to the .env file.

1. Set up your database tables, and seed it with dummy data. In the root directory of the project, run

    ```
        knex migrate:latest
        knex seed:run
    ```
    
1. Run `yarn start-all` in the root directory. 
1. Open `http://localhost:3000/allusers` in your browser to view seed data of all users.

---

## Entity Relationship Diagrams

### users
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK | email | varchar(50) | 
|   | display_name | varchar(255) |
| FK | weather_zipcode | varchar(5) |


### gardens
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK | garden_name | varchar(255) | 
| FK | users_email | varchar(50) |
| FK | plants_plant_id | smallint |


### plants
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK | plant_id | smallint | 
| N | common_name | varchar(255) |
|  | trefle_id | smallint | 
|  | scientific_name | varchar(255) |
|  | duration | varchar(255) |
|  | family_common_name | varchar(255) |
|  | outdoor_plant | boolean |
|  | images | json |
|  | foliage | json |
|  | fruit_or_seed | json |
|  | growth | json |
|  | seed | json |
|  | specifications | json |


### weather
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK  | zipcode | varchar(5) | 
|   | day_max_temp | decimal(5,2) | 
|   | day_min_temp | decimal(5,2) | 
|   | day_total_rain | decimal(5,2) | 
|   | forcast1_max_temp | decimal(5,2) | 
|   | forcast1_min_temp | decimal(5,2) | 
|   | forcast1_total_rain | decimal(5,2) | 
|   | forcast2_max_temp | decimal(5,2) | 
|   | forcast2_min_temp | decimal(5,2) | 
|   | forcast2_total_rain | decimal(5,2) | 


### location
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK FK | weather_zipcode | varchar(5) | 
|  | city | varchar(255) |
|  | state | varchar(2) |
|  | latitude | decimal(9,6) |
|  | longitude | decimal(9,6) |
