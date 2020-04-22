
# :seedling::sunflower:PlantPal's RESTful API Docs



### Table of Contents
- [Users Table](#personnel-table)
- [Plants Table](#DealMaker-Table)
- [Gardens Table](#Pricing-Table)
- [Authentication](#Authentication)
- [Permissions [TBD, Weather-Related]](#Permissions)


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
  auth: true // if successfully authenticated
  token: "authentication_token"
}
```

If user was not successfully registered a validation error with the req.body might exist.


## Users Table
**Features**
  - Read/Update/Delete operations on a user.

**Users Model**

| Column | Optional |   Type    |
| :---: | :---: |  :---:     |
| id | no | serial unique |
| email | no | string(50) | 
| display_name | yes | string(255) |
| zipcode | yes | integer(5) |
| password | no | string(255) |


**Routes**
---

#### **GET** `/api/users`  
Success: Returns JSON object of all users.
Error:
```javascript
{ 
  error: 'Unable to get all user.' 
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
  success: true
}
```
Error:
```javascript
{ 
  error: 'Unable to update user.'
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


### Auth 
**Features**
  - authenticate and authorize users to preform CRUD operations.
  - register new users
  - will not create a new user if their email already exists on the server.


**Routes**



