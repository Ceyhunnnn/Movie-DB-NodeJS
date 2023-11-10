const router = require("express").Router();
const { login, register } = require("../controllers/authControllers");
const AuthValidation = require("../middlewares/validation/authValidation");
router.post("/login", login);
router.post("/register", AuthValidation.register, register);

module.exports = router;
