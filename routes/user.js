const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authTokenMiddleware = require("../middlewares/authTokenMiddleware");
const validationUpdateUserMiddleware = require("../middlewares/validationUpdateUserMiddleware");

router.route('/personal')
    .get(authTokenMiddleware, UserController.index)
    .put(authTokenMiddleware, validationUpdateUserMiddleware, UserController.update);

module.exports = router;




