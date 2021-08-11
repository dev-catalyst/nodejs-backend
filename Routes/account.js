const userController = require("../Controllers/UserController");
const express = require("express");
const router = express.Router();

router.post("/createAccount", userController.createAccount);
router.post("/login", userController.logIn);

module.exports = router;
