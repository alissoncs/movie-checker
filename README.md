# movie-checker

To start this API
```
$ npm install
$ npm start
```

## Endpoints

Method | Endpoint | Description
------ | -------- | -----------
GET | /movies | Retrive all movies registered
GET | /movies/{id} | Retrive a movie
GET | /movies/search/{name} | Retrive all movies filtered by name
POST | /movies | Register e movie
PUT | /movies/{id} | Update a movie by id (full payload)
DELETE | /movies/{id} | Delete a movie by id
GET | /customers | Retrive all customers registered
GET | /customers/{id} | Retrive a customer
GET | /customers/search/{name} | Retrive all customers filtered by name
POST | /customers | Register e customer
PUT | /customers/{id} | Update a customer by id (full payload)
DELETE | /customers/{id} | Delete a customer by id
