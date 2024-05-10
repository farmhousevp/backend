const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.post("/info", userController.fetchSiteDetails);
//router.post("/populate-db", userController.postPopulateDb);

module.exports = router;