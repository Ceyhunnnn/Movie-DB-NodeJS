const router = require("express").Router();
const { login, register, me } = require("../controllers/authControllers");
const { checkToken } = require("../middlewares/auth");
const AuthValidation = require("../middlewares/validation/authValidation");
router.post("/login", AuthValidation.login, login);
router.post("/register", AuthValidation.register, register);
router.get("/me", checkToken, me);
module.exports = router;
