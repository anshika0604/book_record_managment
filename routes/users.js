const express = require("express");

const { users } = require("../data/users.json");
const { UserModel, BookModel } = require('../modals');
const router = express.Router();

// Routes: /users
// Method: get
// Access: Public
// Parameters: None

router.get("/", (req,res)=> {
    res.status(200).json({
        success: true,
        data: users
    });
});

// Routes: /users/id
// Method: get
// Access: Public
// Parameters: id
router.get("/:id", (req,res) => {
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

router.post("/",(req, res) => {
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

router.put("/:id",(req,res) => {
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

router.delete("/:id", (req,res) => {
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

/*
Routes: /users/suubscription-details/:id
Method: Get
Description: Get Subscription Details as per ids
Access: Public
Parameters: id
*/
router.get("/subscription-details/:id", (req,res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }
    const getDateInDay = (data = "") => {
        let date;
        if(data === "") {
            date = new Date();
        }
        else {
            date = new Date(data);
        }
        let days = Math.floor(date /(1000 * 60 *60 *24));
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic") {
            date = date + 90
        }
        else if(user.subscriptionType === "Standard") {
            date = date + 180;
        }
        else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    }
    let returnDate = getDateInDay(user.returnDate);
    let currentDate = getDateInDay();
    let subscriptionDate = getDateInDay(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpiration: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate 
        ? 0 
         : subscriptionExpiration-currentDate,
        fine: returnDate <currentDate 
        ? subscriptionExpiration<= currentDate
            ? 200
            : 100
        : 0,
    };
    return res.status(200).json({success: true,data});
});

// default export
module.exports = router;