const express = require("express");

//import routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const app = express();

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