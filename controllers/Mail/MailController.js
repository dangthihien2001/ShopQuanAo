class MailController {
    checkEmail(req, res, next) {
        res.render("home/checkEmail");
    }
}

module.exports = new MailController();