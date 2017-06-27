# movie-checker

To start this API:

Rename `app/config.json.example` to `app/config.json` and check the database configs
Run `dump.sql` into your mysql database

```
$ npm install
$ npm start
$ # api ready at localhost:3000
```

## Authentication

Retrieve the token using the endpoint POST `/auth` with this payload above:
```
{
  "email": "stevejobs@apple.com",
  "password": "the_big_apple"
}
```
If checked, the API will return
```
{
  "token": 'THE_TOKEN_HERE',
  "expires_at": 1544644
}
```
You must store the token in the front-end (cookie, localstorage, SharedPreferences...)
After this, each request must be sent containing the `Authorization` header filled by token!
Check the next step to know how to create a new user

## Creating a user
POST to `/users` with payload above
```
{
  "name": "Steve Jobs",
  "email": "stevejobs@apple.com",
  "password": "the_big_apple"
}
```

## Endpoints

Method | Endpoint | Description
------ | -------- | -----------
GET | /movies | Retrive all movies registered
GET | /movies/{id} | Retrive a movie
GET | /movies/search/{name} | Retrive all movies filtered by name
POST | /movies | Register a movie
PUT | /movies/{id} | Update a movie by id (full payload)
DELETE | /movies/{id} | Delete a movie by id
GET | /customers | Retrive all customers registered
GET | /customers/{id} | Retrive a customer
GET | /customers/search/{name} | Retrive all customers filtered by name
POST | /customers | Register a customer
PUT | /customers/{id} | Update a customer by id (full payload)
DELETE | /customers/{id} | Delete a customer by id

## Renting endpoints

Method | Endpoint | Description
------ | -------- | -----------
GET | /renting | Retrive all renting movies (movie and customer)
POST | /renting | Rent a movie
DELETE | /renting/{rent_id} | Return a movie
