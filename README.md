# BookService REST API 

This is a simple BookService Rest API. The project is built with typescript, NodeJS and ExpressJS
The store is an in-memory store of Books referenced by the book reference.

## Basic Requirements
***

1. Install Node.js (lts-version v16.15.1)
2. cd into Project root directory 
3. run `npm start`
4. test the endpoints with postman 

### Endpoint 1: 
    
**POST** http://localhost:3000/api/v1/books/retrieve
RequestBody
```json
{
  "bookReference" : "BOOK-GRUFF472"
}
```
---
### Endpoint 2:

**POST** http://localhost:3000/api/v1/books/summary
RequestBody
```json
{
  "bookReference" : "BOOK-GRUFF472"
}
```

---
### Endpoint 3:

**GET** http://localhost:3000/api/v1/books

