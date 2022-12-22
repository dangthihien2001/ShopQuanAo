const express = require("express");
const router = express.Router();

//Middleware
const validateRegisterMiddleware = require("../../middlewares/validationRegisterMiddleware");
const validateLoginMiddleware = require("../../middlewares/validationLoginMiddleware");
const authTokenMiddleware = require("../../middlewares/authTokenMiddleware");
const validateChangePasswordMiddleware = require("../../middlewares/validationChangePasswordMiddleware")

//Controller
const registerController = require("../../controllers/Auth/RegisterController");
const loginController = require("../../controllers/Auth/LoginController");
const accountController = require("../../controllers/Auth/AccountController");


router
  .route("/register")
  .get(registerController.index)
  .post(validateRegisterMiddleware, registerController.create);


router
  .route("/login")
  .get(loginController.index)
  .post(validateLoginMiddleware, loginController.login);

router
  .route("/logout")
  .get(loginController.logout);

router
  .route("/changePassword")
  .put(authTokenMiddleware, validateChangePasswordMiddleware, accountController.changePassword)

router.route("/confirm/:activation_code").get(registerController.verifyAccount);

module.exports = router;
