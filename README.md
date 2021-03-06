# nodejs-express-first-app

### Install dependencies

```
npm install express
npm install express-basic-auth
npm install body-parser
```

### Run the app

`node server.js`

### Request URL

`localhost:3000`

## API

### Get all users

##### Request

`GET /users`

##### Response

```
[
  {
    "id": "0",
    "name": "Alex",
    "enterprise": "SAP"
  }
]
```

### Add a new user

##### Request

`POST /users`

```
{
  "id": "1",
  "name": "Test",
  "enterprise": "SAP"
}
```

##### Response

`User Test (#1) was successfully added`

### Get user data

##### Request

`GET /users/:id`

##### Response

`Alex (#0) works at SAP`

`No entry found for user id #234689`

### Update user data

##### Request

`POST /users/:id`

```
{
  "name": "John",
  "enterprise": "SAP"
}
```

##### Response

`User Alexandra (#0) was successfully updated`

`No user #234689 found`

## TODO

- [x] GET request
- [x] POST request
- [x] Authentication
- [ ] \(Optional) Validation
