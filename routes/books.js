const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../modals");
const { getAllBooks, getSingleBookById, getAllIssuedBooks , addNewBook, updateBookById} = require("../controllers/book-controller");

const router = express.Router();

/*
Routes: /books
Method: GET
Description: Get all the books
Access: Public
Parameters: None
*/
router.get("/", getAllBooks);

/*
Routes: /books/:id
Method: GET
Description: Get books by their id
Access: Public
Parameters: id
*/
router.get("/:id" ,getSingleBookById);

/*
Routes: /books/issued/by-user
Method: GET
Description: Get all issued books
Access: Public
Parameters: None
*/
router.get("/issued/by-user", getAllIssuedBooks);

/*
Routes: /books
Method: POST
Description: Create new Book
Access: Public
Parameters: None
*/
router.post("/", addNewBook);

/*
Routes: /books/:id
Method: PUT
Description: Updating a Book
Access: Public
Parameters: id
*/
router.put("/:id", updateBookById);


module.exports = router;