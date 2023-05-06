const express = require("express");

const { users } = require("../data/users.json");
const { UserModel, BookModel } = require('../modals');
const {getAllUsers, getSingleUserById, deleteUser, updatedUserById, createNewUser, getSubscriptionDetailsById} = require("../controllers/user-controller");
const router = express.Router();

// Routes: /users
// Method: get
// Access: Public
// Parameters: None

router.get("/", getAllUsers);

// Routes: /users/id
// Method: get
// Access: Public
// Parameters: id
router.get("/:id", getSingleUserById);

// Routes: /users/id
// Method: POST
// Description: Create new user
// Access: Public
// Parameters: id

router.post("/", createNewUser);

// Routes: /users/:id
// Method: PUT
// Description: Updating users data
// Access: Public
// Parameters: id

router.put("/:id",updatedUserById);

// Routes: /users/:id
// Method: DELETE
// Description: Deleting user by their id
// Access: Public
// Parameters: id

router.delete("/:id", deleteUser);

/*
Routes: /users/suubscription-details/:id
Method: Get
Description: Get Subscription Details as per ids
Access: Public
Parameters: id
*/
router.get("/subscription-details/:id", getSubscriptionDetailsById);

// default export
module.exports = router;