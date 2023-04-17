const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../modals");
const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controllers/book-controller");

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
router.post("/", (req,res) => {
    const { data } = req.body;
    if(!data) {
        return res.status(400).json({
            success: false,
            message: "No data is Provided"
        });
    }
    const book = books.find((each) => each.id === data.id);

    if(book) {
        return res.status(404).json({
            success: false,
            message: "Book Already Exists"
        });
    }
    const allBooks = [...books,data];
    return res.status(200).json({
        success: true,
        data: allBooks
    });
});

/*
Routes: /books/:id
Method: PUT
Description: Updating a Book
Access: Public
Parameters: id
*/
router.put("/:id", (req,res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = books.find((each) => each.id === id);
    if(!book) {
        return res.status(400).json({
            success: false,
            message: "Book Not Found With Given Id"
        });
    }

    const UpdatedData = books.map((each) => {
        if(each.id === id) {
            return {...each,...data};
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdatedData,
    });
});


module.exports = router;