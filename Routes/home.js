const HomeController = require("../Controllers/HomeController");
const requireAuth = require("../Middlewares/requireAuth");
const express = require("express");
const router = express.Router();
//router.use(requireAuth);

router.get("/", HomeController.getHomeImages.bind(HomeController));
module.exports = router;
