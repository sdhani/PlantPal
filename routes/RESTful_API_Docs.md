
# :seedling::sunflower:PlantPal's RESTful API Docs


### Table of Contents
- [Users Table](#users-routes)
- [Authentication](#auth-routes)
- [Plants Table](#DealMaker-Table)
- [Gardens Table](#Pricing-Table)



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





