const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const requireAuth = require("../Middlewares/requireAuth");
router.use(requireAuth);

router.post("/", userController.updateUser.bind(userController));
router.get("/:userId?", userController.getUser.bind(userController));
module.exports = router;
