# book_record_managment

This is an application called Book Record Managment / API

# Endpoints

## /users
POST : Create a new user
GET : Get all the list of users

## /users/{id}
GET : Get users by ID
PUT : Update the user by ID
DELETE : Delete the user by their ID

## /users/subscription-details{id}
GET : Get user Subscription Details
1. Date of Subscription
2. Valid till ?
3. Fine if any 

## /books
GET : Get all the books
POST : Add a new book

## /books{id}

GET : Get a book by ID
POST : Update a book by ID

## /books/issued
GET : Get all the issued books

## /books/issued/withFine
GET : Get all the issued books with fine

## Subscription Types
Basic (3 months)
Standard (6 months)
Premium (12 months)