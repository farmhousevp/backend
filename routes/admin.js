const express = require("express");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

const adminController = require("../controllers/admin");

//router.post("/create-super-admin", adminController.createSuperAdmin);

router.post("/login", adminController.adminLogin);

router.post("/create-admin", isAuth, adminController.createAdmin);

router.post("/fetch-admin", isAuth, adminController.fetchAdmin);

router.post("/fetch-all-admin-details", isAuth, adminController.fetchSuperAdminSiteData);

router.post("/update-admin-details", isAuth, adminController.updateAdminSiteData);

router.post("/generate-new-link", isAuth, adminController.generateNewUrl);

router.post("/delete-url", adminController.deleteAdminUrl);


module.exports = router;