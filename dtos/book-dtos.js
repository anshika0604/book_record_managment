// DTO - Data Transfer Object

class IssuedBook{
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnData;
    
    constructor(user) {
        this._id = user.IssuedBook._id;
        this.name = user.IssuedBook.name;
        this.genre = user.IssuedBook.genre;
        this.price = user.IssuedBook.price;
        this.publisher = user.IssuedBook.publisher;
        this.issuedBy = user.IssuedBook.issuedBy;
        this.issuedDate = user.IssuedBook.issuedDate;
        this.returnData = user.IssuedBook.returnData;
    }
    
}
module.exports = IssuedBook;