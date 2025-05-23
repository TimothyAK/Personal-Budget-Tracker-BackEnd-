const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/reset", userController.resetPassword);

module.exports = router