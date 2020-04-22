
# :seedling::sunflower:PlantPal's RESTful API Docs


### Table of Contents
- [Users Table](#users-routes)
- [Authentication](#auth-routes)
- [Plants Table](#plants-routes)
- [Gardens Table](#gardens-routes)



## Introduction 
This is documentation for PlantPal's RESTful API.

| Database Table | Supported Operations | Authentication | Permissions |
| :---: | :---: | :---: | :---: | 
| users [auth] | CRUD, Login/Logout | yes| Completed |
| plants | CRUD, Query | yes| Completed |
| gardens | CRUD | yes | Completed |
| weather | TBD | TBD |W.I.P| 
| location | TBD | TBD |W.I.P| 

### **Usage:**
*A request with the proper body must be sent out to:*
`/api/*database_table*/*operation*`
 

**Examples:** [POST]: `localhost:3001/api/auth/register`
```javascript
req.body = {
  "email":"awesome148@people.com",
  "display_name":"Awesome148",
  "zipcode":"10000",
  "password":"some_password",
}
```

The result of this post request will return a JSON object.
```javascript
{
  "auth": true // if successfully authenticated
  "token": "authentication_token"
}
```

If user was not successfully registered a validation error with the req.body might exist.


## Users Routes

---
#### **GET** `/api/users`  
Success: Returns JSON object of all users.

Error:
```javascript
{ 
  "error": 'Unable to get all user.' 
}
```

---

#### **PUT** `/api/users`  
Expecting:
```javascript
/* Only one of these fields must be supplied */
req.body = {
  "email":"awesomer149@people.com", 
  "display_name":"Awesome149",
  "zipcode":"10001",
  "password":"some_new_password",
}
```

Success: 
```javascript
{
  "success": true
}
```
Error:
```javascript
{ 
  "error": 'Unable to update user.'
}
```

---

#### **DEL** `/api/users/delete`  
Expecting:
```javascript
/* Only one of these fields must be supplied */
req.body = {
  "email":"awesomer149@people.com", 
  "display_name":"Awesome149",
  "zipcode":"10001",
  "password":"some_new_password",
}
```
Success: 
```javascript
{
  success: true
}
```
Error:
```javascript
{ 
  error: 'Unable to delete user.'
}
```

---

## Auth Routes 
**Features**
  - authenticate and authorize users to preform CRUD operations.
  - register new users
  - will not create a new user if their email already exists on the server.

---
#### **GET** `/api/auth/register`  
Expecting:
```javascript
req.body = {
  "email": "user5@gmail.com",
  "display_name": "user5",
  "password": "password",
  "zipcode": 10000
}
```

Success:
```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```
Possible Errors:
```javascript
{ 
  "error": 'Email already exists on server.'
}

/* Other error messages include invalid type, and field not provided. */
```

---

#### **GET** `/api/auth/me`  
Success: Returns current user's info.
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
Error:
```javascript
{ 
  "error": 'There was a problem getting the current user\'s info.'
}
```

---

#### **POST** `/api/auth/login`  
Expecting:
```javascript
/* Only one of these fields must be supplied */
req.body = {
  "email": "user5@gmail.com",
  "password": "password"
}
```
Success: 
```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```
Error:
```javascript
{ 
  "error": 'Unable to delete user.'
}
```

---

## Plants Routes 
**Features**
  - authenticate and authorize users to preform CRUD operations.
  - register new users
  - will not create a new user if their email already exists on the server.

---
#### **GET** `/api/plants`  
- Get all plants from user

Success:
```javascript
{
  "auth": true,
  "token": "authentication_token"
}
```
Errors:
```javascript
{ 
  "error": 'User does not have any plants.'
}
```

---

#### **GET** `/api/plants/query`
- Get a list of potential plants to add to the user's garden.
Expecting:
```javascript
req.body = {  
  "plant_query": "daisy" 
}
```

Success: Returns one or more plants that match the query from the [Trefle API]()
```javascript
[
    {
        "common_name": "white doll's daisy",
        "complete_data": true,
        "id": 111928,
        "link": "http://trefle.io/api/plants/111928",
        "scientific_name": "Boltonia asteroides",
        "slug": "boltonia-asteroides"
    },
    {
        "common_name": "false daisy",
        "complete_data": true,
        "id": 131305,
        "link": "http://trefle.io/api/plants/131305",
        "scientific_name": "Eclipta prostrata",
        "slug": "eclipta-prostrata"
    },
    {
        "common_name": "Engelmann's daisy",
        "complete_data": true,
        "id": 132370,
        "link": "http://trefle.io/api/plants/132370",
        "scientific_name": "Engelmannia peristenia",
        "slug": "engelmannia-peristenia"
    },
    {
        "common_name": "oxeye daisy",
        "complete_data": true,
        "id": 149582,
        "link": "http://trefle.io/api/plants/149582",
        "scientific_name": "Leucanthemum vulgare",
        "slug": "leucanthemum-vulgare"
    },
    {
        "common_name": "cutleaf daisy",
        "complete_data": true,
        "id": 133520,
        "link": "http://trefle.io/api/plants/133520",
        "scientific_name": "Erigeron compositus",
        "slug": "erigeron-compositus"
    }
]
```

Error:
```javascript
{ 
  "error": 'Something went wrong with this query.'
}
```

---

#### **POST** `/api/plants`  
- Add plant to user's account.

**Adding based on Trefle Query**
Expecting: 
```javascript
{
    "garden_id": 9, /* number of a garden that belongs to the current user */
    "outdoor_plant": false,
    "trefle_id": 111928 /* Indicates Trefle API Add */
}

```

**Adding Manually**
Expecting: 
```javascript
{
    "garden_id": 9, /* number of a garden that belongs to the current user */
    "outdoor_plant": false,
    "common_plant": "carrots"
}

```

Success: 
```javascript
{
    "success": true
}
```
Error:
- JSON object containing a specific error message.

---
#### **GET** `/api/plants/:id`  
- Get a plant's data with :id.

Success: 
- JSON object of plant data.

Error:
- JSON object containing a specific error message.

---
#### **PUT** `/api/plants/:id`  
- Update plant with :id.

Success: 
- JSON object of plant data.

Error:
- JSON object containing a specific error message.

---
#### **DEL** `/api/plants/:id/delete`  
- Delete plant with :id.

Success: 
{
  "success": true
}
Error:
- JSON object containing a specific error message.

---

## Gardens Routes 
**Features**
  - CRUD operations.

---

#### **GET** `/api/gardens`  
- Get all gardens from a user .

Success:
```javascript
[
    {
        "id": 6,
        "garden_name": "The awesomest garden!",
        "user_id": 24
    },
    {
        "id": 7,
        "garden_name": "Herb Garden",
        "user_id": 24
    }
]
```
Errors:
```javascript
{ 
  "error": 'Unable to get all gardens.'
```

---

#### **GET** `/api/gardens/:id`  
- Get a garden with :id from a user.

Success:
- Example payload.
```javascript
[
    {
        "id": 6,
        "garden_name": "The awesomest garden!",
        "user_id": 24
    }
]
```
Errors:
```javascript
{ 
  "error": 'Invalid garden. User does not own garden.'
```

---

#### **GET** `/api/gardens/:id/plants`  
- Get all plants associated with garden :id.

Success:
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
Errors:
```javascript
{ 
  "error": 'Unable to get all plants from garden.'
```

---

#### **POST** `/api/gardens`  
- Add new garden.

Expecting:
```javascript
{
	 "garden_name": "Herb Garden"
}
```

Success:
- Example payload.
```javascript
{
  "success": true
}
```
Errors:
```javascript
{ 
  "error": 'Unable to add new garden.'
}
```

---

#### **PUT** `/api/gardens/:id`  
- Update garden with :id

Expecting:
```javascript
{
	 "garden_name": "Herb Oasis"
}
```

Success:
- Example payload.
```javascript
{
  "success": true
}
```
Errors:
```javascript
{ 
  "error": `Unable to update garden ${garden_name}.`
}
```

---

#### **DEL** `/api/gardens/:id`  
- Delete garden with :id

Success:
- Example payload.
```javascript
{
  "success": true
}
```
Errors:
```javascript
{ 
  "error": 'Failed to delete garden.'
```

---

