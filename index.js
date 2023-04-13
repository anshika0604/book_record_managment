const express = require("express");

// import DB Connection file
const DbConnection = require("./databaseConnection");

//import db
const dotenv = require("dotenv");

//import routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();
const app = express();

DbConnection();

const port = 8081;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
        message: "Server is up and running sucessfully"
    });
});

app.use("/users",userRouter);
app.use("/books",bookRouter);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});