const express = require("express");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/update-user-info", isAuth, adminController.updateUserData);
router.post("/login", adminController.adminLogin);

router.post("/reset-admin-info", adminController.resetAdminData);

module.exports = router;