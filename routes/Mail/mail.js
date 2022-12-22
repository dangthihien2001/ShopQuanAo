const express = require("express");
const router = express.Router();

const mailController = require("../../controllers/Mail/MailController");

router.route('/notify').get(mailController.checkEmail);

module.exports = router;