const { UserModel, BookModel } = require('../modals');
const IssuedBook = require('../dtos/book-dtos');
const getAllBooks = async (req, res) => {
    const books = await BookModel.find();

    if(books.length == 0) 
        return res.status(404).json({
            success: false,
            message: "No Book found",
        });
    res.status(200).json({
        success: true,
        data: books,
    });
};

const getSingleBookById = async (req,res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if(!book) {
        return res.status(404).json({sucess:false, 
            message: "Book not found"});
    }
    return res.status(200).json({success: true, data: book});
};

const getAllIssuedBooks = async (req,res) => {
    const users = await BookModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new IssuedBook(each));
    if(issuedBooks.length === 0) {
        return res.status(404).json({success: false,
        message: "No Books have been issued"});
    }
    return res.status(200).json({success: true,
    data: issuedBooks});
};

const addNewBook = async (req,res) => {
    const { data } = req.body;
    if(!data) {
        return res.status(400).json({
            success: false,
            message: "No data is Provided"
        });
    }
    await BookModel.create(data);

    const allBooks = await BookModel.find();

    // if(book) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Book Already Exists"
    //     });
    // }
    return res.status(200).json({
        success: true,
        data: allBooks
    });
};

const updateBookById = async (req,res) => {
    const { id } = req.params;
    const { data } = req.body;
    
    const updateBook = await BookModel.findOneAndUpdate({_id: id}, data,{
        new: true,
    });
    return res.status(200).json({
        success: true,
        data: updateBook,
    });
};

module.exports = { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById};