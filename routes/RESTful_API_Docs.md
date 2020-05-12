# PlantPal's RESTful API Docs :seedling::sunflower:

### Table of Contents

- [Introduction](#introduction)
- [Users](#users-routes)
- [Authentication](#auth-routes)
- [Plants](#plants-routes)
- [Gardens](#gardens-routes)

# Introduction

This is documentation for PlantPal's RESTful API.

| Database Table | Supported Operations | Authentication | Permissions |
| :------------: | :------------------: | :------------: | :---------: |
|  users [auth]  |  CRUD, Login/Logout  |      yes       |  Completed  |
|     plants     |     CRUD, Query      |      yes       |  Completed  |
|    gardens     |         CRUD         |      yes       |  Completed  |
|    weather     |         TBD          |      TBD       |    W.I.P    |
|    location    |         TBD          |      TBD       |    W.I.P    |

### **Usage:**

A request with the proper body must be sent out to: `/api/*database_table*/*operation*`

**Examples:** [POST]: `localhost:3001/api/auth/register`

```javascript
req.body = {
  email: "awesome148@people.com",
  display_name: "Awesome148",
  zipcode: "10000",
  password: "some_password"
};
```

The result of this post request will return a JSON object.

```javascript
{
  "auth": true // if successfully authenticated
  "token": "authentication_token"
}
```

If user was not successfully registered a validation error with the req.body might exist.

# Users Routes

### Users Schema

| Key |    Column    |     Type      |
| :-: | :----------: | :-----------: |
| PK  |      id      | serial unique |
|     |    email     |  varchar(50)  |
|     | display_name | varchar(255)  |
|     |   zipcode    |  varchar(5)   |
|     |   password   | varchar(255)  |

### Operations

- [GET `/api/users`](#get-apiusers)
- [PUT `/api/users`](#put-apiusers)
- [DEL `/api/users/delete`](#del-apiusersdelete)

---

#### **GET** `/api/users`

- Get all users.

**Success: :heavy_check_mark:**

- Returns JSON object of all users.

**Error: :x:**

```javascript
{
  "error": 'Unable to get all users.'
}
```

[top users](#users-routes)

---

#### **PUT** `/api/users`

- Update authenticated user.

Expecting:

```javascript
/* Only one of these fields must be supplied */
req.body = {
  email: "awesomer149@people.com",
  display_name: "Awesome149",
  zipcode: "10001",
  password: "some_new_password"
};
```

**Success: :heavy_check_mark:**

```javascript
{
  "success": true
}
```

**Error: :x:**

```javascript
{
  "error": 'Unable to update user.'
}
```

[top users](#users-routes)

---

#### **DEL** `/api/users/delete`

- Delete user with :id.

Expecting:

```javascript
/* Only one of these fields must be supplied */
req.body = {
  email: "awesomer149@people.com",
  display_name: "Awesome149",
  zipcode: "10001",
  password: "some_new_password"
};
```

**Success: :heavy_check_mark:**

```javascript
{
  success: true;
}
```

**Error: :x:**

```javascript
{
  error: "Unable to delete user.";
}
```

[top users](#users-routes)

---

# Auth Routes

**Features**

- Authenticate and authorize users to perform CRUD operations.
- Register new users.
- Will not create a new user if their email already exists on the server.

### Operations

- [GET `/api/auth/register`](#get-apiauthregister)
- [GET `/api/auth/me`](#get-apiauthme)
- [POST `/api/auth/login`](#post-apiauthlogin)
- [GET `/api/auth/logout`](#get-apiauthlogout)

### Notes

- :warning: Auth Token is expected to be passed as an `x-access-token` header variable. If the token is stored as cookies on the client side, the API is expecting the cookie to be named **_x-access-token_**

All authorized API Routes are Expecting a Header that has this key:

```javascript
{
    "x-access-token":"special-jwt-token-value",
}
```

---

#### **GET** `/api/auth/register`

- Register new user.

Expecting:

```javascript
req.body = {
  email: "user5@gmail.com",
  display_name: "user5",
  password: "password",
  zipcode: 10000
};
```

**Success: :heavy_check_mark:**

```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```

**Error: :x:**

```javascript
{
  "error": 'Email already exists on server.'
}
/* Other error messages include invalid type, and field not provided. */
```

[(top auth)](#auth-routes)

---

#### **GET** `/api/auth/me`

- Get current user's info.

**Success: :heavy_check_mark:**

```javascript
[
    {
        "id": 5
        "email": "user5@gmail.com",
        "display_name": "user5",
        "zipcode": 10000
    }
]
```

**Error: :x:**

```javascript
{
  "error": 'There was a problem getting the current user\'s info.'
}
```

[(top auth)](#auth-routes)

---

#### **POST** `/api/auth/login`

- Login user.

Expecting:

```javascript
/* Only one of these fields must be supplied */
req.body = {
  email: "user5@gmail.com",
  password: "password"
};
```

**Success: :heavy_check_mark:**

```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```

**Error: :x:**

```javascript
{
  "error": 'Unable to delete user.'
}
```

[(top auth)](#auth-routes)

---

#### **GET** `/api/auth/logout`

- Logout user.
- :warning: Requires client action to delete token from cookies.

**Success: :heavy_check_mark:**

```javascript
{
  "auth": false,
  "token": null
}
```

[(top auth)](#auth-routes)

---

# Plants Routes

**Features**

- Only for authenticated and authorized users.
- Plant CRUD Operations
- Query Plant in Trefle

### Plants Schema

| Key |       Column       |     Type      |
| :-: | :----------------: | :-----------: |
| PK  |         id         | serial unique |
|     |     garden_id      |   smallint    |
|     |      user_id       |   smallint    |
|     |    common_name     | varchar(255)  |
|     |  scientific_name   | varchar(255)  |
|     |     trefle_id      |   smallint    |
|     |      duration      | varchar(255)  |
|     |   outdoor_plant    |    boolean    |
|     |    last_watered    |     date      |
|     |       images       |     json      |
|     |      foliage       |     json      |
|     |   fruit_or_seed    |     json      |
|     |       growth       |     json      |
|     |        seed        |     json      |
|     |   specifications   |     json      |
|     | family_common_name | varchar(255)  |

### Operations

- [GET `/api/plants`](#get-apiplants)
- [GET `/api/plants/query`](#get-apiplantsquery)
- [POST `/api/plants`](#post-apiplants)
- [GET `/api/plants/:id`](#get-apiplantsid)
- [PUT `/api/plants/:id`](#put-apiplantsid)
- [DEL `/api/plants/:id/delete`](#del-apiplantsiddelete)

---

#### **GET** `/api/plants`

- Get all plants from user

```javascript
[
  {
    id: 1,
    garden_id: 1,
    user_id: 1,
    common_name: "rose",
    scientific_name: null,
    trefle_id: null,
    duration: null,
    outdoor_plant: true,
    last_watered: "2020-05-12",
    images: null,
    foliage: null,
    fruit_or_seed: null,
    growth: null,
    seed: null,
    specifications: null,
    family_common_name: null
  },
  {
    id: 2,
    garden_id: 1,
    user_id: 1,
    common_name: "daisy",
    scientific_name: null,
    trefle_id: null,
    duration: null,
    outdoor_plant: false,
    last_watered: "2020-05-05",
    images: null,
    foliage: null,
    fruit_or_seed: null,
    growth: null,
    seed: null,
    specifications: null,
    family_common_name: null
  }
];
```

**Success: :heavy_check_mark:**

```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```

**Error: :x:**

```javascript
{
  "error": 'User does not have any plants.'
}
```

[(top plants)](#plants-routes)

---

#### **GET** `/api/plants/query`

- Get a list of potential plants to add to the user's garden.

Expecting:

```javascript
req.body = {
  plant_query: "daisy"
};
```

**Success: :heavy_check_mark:**

- Returns one or more plants that match the query from the [Trefle API](https://trefle.io/)

```javascript
[
  {
    common_name: "white doll's daisy",
    complete_data: true,
    id: 111928,
    link: "http://trefle.io/api/plants/111928",
    scientific_name: "Boltonia asteroides",
    slug: "boltonia-asteroides"
  },
  {
    common_name: "false daisy",
    complete_data: true,
    id: 131305,
    link: "http://trefle.io/api/plants/131305",
    scientific_name: "Eclipta prostrata",
    slug: "eclipta-prostrata"
  },
  {
    common_name: "Engelmann's daisy",
    complete_data: true,
    id: 132370,
    link: "http://trefle.io/api/plants/132370",
    scientific_name: "Engelmannia peristenia",
    slug: "engelmannia-peristenia"
  },
  {
    common_name: "oxeye daisy",
    complete_data: true,
    id: 149582,
    link: "http://trefle.io/api/plants/149582",
    scientific_name: "Leucanthemum vulgare",
    slug: "leucanthemum-vulgare"
  },
  {
    common_name: "cutleaf daisy",
    complete_data: true,
    id: 133520,
    link: "http://trefle.io/api/plants/133520",
    scientific_name: "Erigeron compositus",
    slug: "erigeron-compositus"
  }
];
```

**Error: :x:**

```javascript
{
  "error": 'Something went wrong with this query.'
}
```

[(top plants)](#plants-routes)

---

#### **POST** `/api/plants`

- Add plant to user's account.

**Adding based on Trefle Query**
Expecting:

```javascript
{
    "garden_id": 1, /* number of a garden that belongs to the current user */
    "outdoor_plant": false,
    "trefle_id": 111928 /* Indicates Trefle API Add */
    "last_watered": "2020-05-12", /* Optional */
    "name": "My FAV PLANT" /* Optional */
}

```

**Adding Manually**
Expecting:

```javascript
{
    "garden_id": 1, /* number of a garden that belongs to the current user */
    "outdoor_plant": false,
    "common_plant": "carrots",
    "last_watered": "2020-05-12", /* Optional */
    "name": "My FAV PLANT" /* Optional */
}

```

**Success: :heavy_check_mark:**

```javascript
{
    "success": true
}
```

**Error: :x:**

- JSON object containing a specific error message.

```javascript
{
  "error": 'Unable to add plant.'
}
```

[(top plants)](#plants-routes)

---

#### **GET** `/api/plants/:id`

- Get a plant's data with :id.

**Success: :heavy_check_mark:**

- JSON object of plant data.

```javascript
{
    id: 8,
    garden_id: 6,
    user_id: 24,
    common_name: "cutleaf daisy",
    name: "MY FAV PLANT",
    scientific_name: "Erigeron compositus",
    trefle_id: 133520,
    duration: "Perennial",
    outdoor_plant: null,
    last_watered: null,
    images: [
        {
        url:
            "https://upload.wikimedia.org/wikipedia/commons/8/8b/Erigeron_compositus_%288161931839%29.jpg"
        },
        {
        url:
            "https://upload.wikimedia.org/wikipedia/commons/e/ed/Bellis_perennis3_ies.jpg"
        }
    ],
    foliage: {
        color: "Green",
        porosity_summer: "Dense",
        porosity_winter: "Porous",
        texture: "Medium"
    },
    fruit_or_seed: {
        color: "Brown",
        conspicuous: null,
        seed_abundance: "Medium",
        seed_period_begin: "Spring",
        seed_period_end: "Summer",
        seed_persistence: null
    },
    growth: {
        anaerobic_tolerance: "None",
        caco_3_tolerance: "High",
        cold_stratification_required: true,
        drought_tolerance: "High",
        fertility_requirement: "Low",
        fire_tolerance: "Medium",
        frost_free_days_minimum: 80,
        hedge_tolerance: "None",
        moisture_use: "Low",
        ph_maximum: 8.1,
        ph_minimum: 6.1,
        planting_density_maximum: {
        acre: null,
        sqm: null
        },
        planting_density_minimum: {
        acre: null,
        sqm: null
        },
        precipitation_maximum: {
        cm: 60.96012192024385,
        inches: 24
        },
        precipitation_minimum: {
        cm: 25.400050800101603,
        inches: 10
        },
        resprout_ability: null,
        root_depth_minimum: {
        cm: 25.400050800101603,
        inches: 10
        },
        salinity_tolerance: "Low",
        shade_tolerance: "Intolerant",
        temperature_minimum: {
        deg_c: -36.11111111111111,
        deg_f: -33
        }
    },
    seed: {
        bloom_period: "Late Spring",
        commercial_availability: "Contracting Only",
        seed_spread_rate: "Moderate",
        seedling_vigor: "Medium",
        seeds_per_pound: 250000,
        small_grain: null,
        vegetative_spread_rate: "None"
    },
    specifications: {
        bloat: "None",
        c_n_ratio: "Medium",
        coppice_potential: null,
        fall_conspicuous: null,
        fire_resistance: null,
        growth_form: "Single Crown",
        growth_habit: "Forb/herb",
        growth_period: "Spring and Summer",
        growth_rate: "Moderate",
        known_allelopath: null,
        leaf_retention: null,
        lifespan: "Moderate",
        low_growing_grass: null,
        mature_height: {
        cm: 30.478512648582743,
        ft: 1
        },
        max_height_at_base_age: {
        cm: null,
        ft: null
        },
        nitrogen_fixation: "None",
        regrowth_rate: "Slow",
        shape_and_orientation: "Decumbent",
        toxicity: "None"
    },
    family_common_name: "Aster family"
};
```

**Error: :x:**

- JSON object containing a specific error message.

```javascript
{
  "error": 'Unable to get plant info.'
}
```

[(top plants)](#plants-routes)

---

#### **PUT** `/api/plants/:id`

- Update plant with :id.

Expecting:

- Currently only updates these columns "garden_id", "outdoor_plant", "images", "last_watered".

```javascript
{
	"last_watered": "2020-04-21", /* Optional */
	"name": "2020-04-21", /* Optional */
	"common_name": "2020-04-21", /* Optional */
	"outdoor_plant": true,
	"garden_id": 8 	 /* required */
}
```

**Success: :heavy_check_mark:**

```javascript
{
    "success": true
}
```

**Error: :x:**

- JSON object containing a specific error message.

```javascript
{
  "error": 'Unable to update plant info.'
}
```

[(top plants)](#plants-routes)

---

#### **DEL** `/api/plants/:id/delete`

- Delete plant with :id.

**Success: :heavy_check_mark:**

```javascript
{
  "success": true
}
```

**Error: :x:**

- JSON object containing a specific error message.

```javascript
{
  "error": 'Unable to delete plant.'
}
```

[(top plants)](#plants-routes)

---

# Gardens Routes

**Features**

- Garden CRUD operations.

### Gardens Schema

| Key |   Column    |     Type      |
| :-: | :---------: | :-----------: |
| PK  |     id      | serial unique |
|     | garden_name | varchar(255)  |
| FK  |   user_id   |    integer    |

### Operations

- [GET `/api/gardens`](#get-apigardens)
- [GET `/api/gardens/:id`](#get-apigardensid)
- [GET `/api/gardens/:id/plants`](#get-apigardensid/plants)
- [POST `/api/gardens`](#post-apigardens)
- [PUT `/api/gardens/:id`](#put-apigardensid)
- [DEL `/api/plants/:id/delete`](#del-apigardensiddelete)

---

#### **GET** `/api/gardens`

- Get all gardens from a user .

**Success: :heavy_check_mark:**

```javascript
[
  {
    id: 6,
    garden_name: "The awesomest garden!",
    user_id: 24
  },
  {
    id: 7,
    garden_name: "Herb Garden",
    user_id: 24
  }
];
```

**Error: :x:**

```javascript
{
  "error": 'Unable to get all gardens.'
}
```

[(top gardens)](#gardens-routes)

---

#### **GET** `/api/gardens/:id`

- Get a garden with :id from a user.

**Success: :heavy_check_mark:**

- Example payload.

```javascript
[
  {
    id: 6,
    garden_name: "The awesomest garden!",
    user_id: 24
  }
];
```

**Error: :x:**

```javascript
{
  "error": 'Invalid garden. User does not own garden.'
}
```

[(top gardens)](#gardens-routes)

---

#### **GET** `/api/gardens/:id/plants`

- Get all plants associated with garden :id.

**Success: :heavy_check_mark:**

- Example payload.

```javascript
[
    {
        "id": 8,
        "garden_id": 6,
        "user_id": 24,
        "common_name": "cutleaf daisy",
        "scientific_name": "Erigeron compositus",
        "trefle_id": 133520,
        "duration": "Perennial",
        "outdoor_plant": null,
        "last_watered": null,
        "images": [
            {
                "url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Erigeron_compositus_%288161931839%29.jpg"
            },
            {
                "url": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Bellis_perennis3_ies.jpg"
            }
        ],
        "foliage": {
            "color": "Green",
            "porosity_summer": "Dense",
            "porosity_winter": "Porous",
            "texture": "Medium"
        },
        "fruit_or_seed": {
            "color": "Brown",
            "conspicuous": null,
            "seed_abundance": "Medium",
            "seed_period_begin": "Spring",
            "seed_period_end": "Summer",
            "seed_persistence": null
        },
        "growth": {
            "anaerobic_tolerance": "None",
            "caco_3_tolerance": "High",
            "cold_stratification_required": true,
            "drought_tolerance": "High",
            "fertility_requirement": "Low",
            "fire_tolerance": "Medium",
            "frost_free_days_minimum": 80,
            "hedge_tolerance": "None",
            "moisture_use": "Low",
            "ph_maximum": 8.1,
            "ph_minimum": 6.1,
            "planting_density_maximum": {
                "acre": null,
                "sqm": null
            },
            "planting_density_minimum": {
                "acre": null,
                "sqm": null
            },
            "precipitation_maximum": {
                "cm": 60.96012192024385,
                "inches": 24
            },
            "precipitation_minimum": {
                "cm": 25.400050800101603,
                "inches": 10
            },
            "resprout_ability": null,
            "root_depth_minimum": {
                "cm": 25.400050800101603,
                "inches": 10
            },
            "salinity_tolerance": "Low",
            "shade_tolerance": "Intolerant",
            "temperature_minimum": {
                "deg_c": -36.11111111111111,
                "deg_f": -33
            }
        },
        "seed": {
            "bloom_period": "Late Spring",
            "commercial_availability": "Contracting Only",
            "seed_spread_rate": "Moderate",
            "seedling_vigor": "Medium",
            "seeds_per_pound": 250000,
            "small_grain": null,
            "vegetative_spread_rate": "None"
        },
        "specifications": {
            "bloat": "None",
            "c_n_ratio": "Medium",
            "coppice_potential": null,
            "fall_conspicuous": null,
            "fire_resistance": null,
            "growth_form": "Single Crown",
            "growth_habit": "Forb/herb",
            "growth_period": "Spring and Summer",
            "growth_rate": "Moderate",
            "known_allelopath": null,
            "leaf_retention": null,
            "lifespan": "Moderate",
            "low_growing_grass": null,
            "mature_height": {
                "cm": 30.478512648582743,
                "ft": 1
            },
            "max_height_at_base_age": {
                "cm": null,
                "ft": null
            },
            "nitrogen_fixation": "None",
            "regrowth_rate": "Slow",
            "shape_and_orientation": "Decumbent",
            "toxicity": "None"
        },
        "family_common_name": "Aster family"
    },
    {...},
]
```

**Error: :x:**

```javascript
{
  "error": 'Unable to get all plants from garden.'
}
```

[(top gardens)](#gardens-routes)

---

#### **POST** `/api/gardens`

- Add new garden.

Expecting:

```javascript
{
	 "garden_name": "Herb Garden"
}
```

**Success: :heavy_check_mark:**

- Example payload.

```javascript
{
  "success": true
}
```

**Error: :x:**

```javascript
{
  "error": 'Unable to add new garden.'
}
```

[(top gardens)](#gardens-routes)

---

#### **PUT** `/api/gardens/:id`

- Update garden with :id

Expecting:

```javascript
{
	 "garden_name": "Herb Oasis"
}
```

**Success: :heavy_check_mark:**

- Example payload.

```javascript
{
  "success": true
}
```

**Error: :x:**

```javascript
{
  "error": `Unable to update garden ${garden_name}.`
}
```

[(top gardens)](#gardens-routes)

---

#### **DEL** `/api/gardens/:id/delete`

- Delete garden with :id

**Success: :heavy_check_mark:**

- Example payload.

```javascript
{
  "success": true
}
```

**Error: :x:**

```javascript
{
  "error": 'Failed to delete garden.'
}
```

[(top gardens)](#gardens-routes)

---

# Weather Routes

**Features**

### weather

| Key |       Column        |     Type     |
| :-: | :-----------------: | :----------: |
| PK  |         id          |   integer    |
|     |     location_id     |   integer    |
|     |       user_id       |   integer    |
|     |       zipcode       |  varchar(5)  |
|     |    day_max_temp     | decimal(5,2) |
|     |    day_min_temp     | decimal(5,2) |
|     |   day_total_rain    | decimal(5,2) |
|     |  forcast1_max_temp  | decimal(5,2) |
|     |  forcast1_min_temp  | decimal(5,2) |
|     | forcast1_total_rain | decimal(5,2) |
|     |  forcast2_max_temp  | decimal(5,2) |
|     |  forcast2_min_temp  | decimal(5,2) |
|     | forcast2_total_rain | decimal(5,2) |

---

# Location Routes

**Features**

### location

| Key |     Column      |     Type      |
| :-: | :-------------: | :-----------: |
| PK  |       id        | serial unique |
| FK  |     user_id     |    integer    |
|     | weather_zipcode |  varchar(5)   |
|     |      city       | varchar(255)  |
|     |      state      |  varchar(2)   |
|     |    latitude     | decimal(9,6)  |
|     |    longitude    | decimal(9,6)  |

[(top introduction)](#introduction)

---

> End of Docs
