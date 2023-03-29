const express = require("express");

const { users } = require("./data/users.json");

const router = express.Router();

// Routes: /users
// Method: get
// Access: Public
// Parameters: None

router.get("/users", (req,res)=> {
    res.status(200).json({
        success: true,
        data: users
    })
})

// Routes: /users/id
// Method: get
// Access: Public
// Parameters: id
router.get("/users/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

// Routes: /users/id
// Method: POST
// Description: Create new user
// Access: Public
// Parameters: id

router.post("/users",(req, res) => {
    const{id, name, surname ,email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exist"
        });
    }
    users.push({
        id,
        name,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: users,
    });
})

// Routes: /users/:id
// Method: PUT
// Description: Updating users data
// Access: Public
// Parameters: id

router.put("/users/:id",(req,res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }
    const UpdateUser = users.map((each) => {
        if(each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdateUser,
    });
});

// Routes: /users/:id
// Method: DELETE
// Description: Deleting user by their id
// Access: Public
// Parameters: id

router.delete("/users/:id", (req,res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success: true,
        data: users
    });
});

// default export
module.exports = router;