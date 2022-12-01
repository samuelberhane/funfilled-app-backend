const express = require("express");
const router = express.Router();
const { userSignup, userLogin } = require("../controllers/userController");

// user signup
router.post("/signup", userSignup);

// user login
router.post("/login", userLogin);

module.exports = router;
