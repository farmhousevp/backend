const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/info", userController.getUserData);
//router.post("/populate-db", userController.postPopulateDb);

module.exports = router;