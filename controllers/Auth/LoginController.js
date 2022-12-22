const bcrypt = require("bcryptjs");
const Account = require("../../models/Account");
const User = require("../../models/User");

class LoginController {
  //[GET] index
  index(req, res, next) {
    res.render("home/login");
  }

  //[POST] login
  async login(req, res, next) {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (account) {
      bcrypt.compare(password, account.password, async (error, same) => {
        if (same) {
          // if passwords match
          req.session.token = account.token_sceret;
          userGlobal = await User.findById(account.userId);
          return res
            .status(200)
            .json({ message: "OK", isActive: account.status });
        } else {
          return res.status(400).json({
            error: [{ key: "password", err: " Email or Password not match" }],
          });
        }
      });
    } else {
      return res.status(400).json({
        error: [{ key: "password", err: " Email or Password not match" }],
      });
    }
  }

  logout(req, res, next) {
    userGlobal = null;
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  }
}

module.exports = new LoginController();
