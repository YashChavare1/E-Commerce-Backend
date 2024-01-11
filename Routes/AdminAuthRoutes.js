const express = require('express');
const { adminRegisterController, adminLoginController } = require('../Controller/AdminAuthController');
const router = express.Router();

router.post("/register", adminRegisterController);
router.get("/login", adminLoginController);

module.exports = router;