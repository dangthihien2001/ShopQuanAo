const bcrypt = require("bcryptjs");
const Account = require("../models/Account");
const isPassword = require("../public/assets/regex/isPassword");
module.exports = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const data = { ...req.body };
  let error = [];

  for (key in data) {
    if (data[key] === "") {
      error.push({
        key,
        err: `${key} is require`,
      });
    }
  }

  if (password !== "") {
    if (!isPassword.test(password)) {
      error.push({
        key: "password",
        err: `Invalid. Minimum eight characters, at least one letter and one number`,
      });
    } else {
      const account = await Account.findOne({ userId: req.userId });
      if (account) {
        bcrypt.compare(password, account.password, (err, same) => {
          if (same) {
            // if passwords match
          } else {
            error.push({
              key: "password", 
              err: "Password not match"
            });
          }
        });
      }
    }
  }


  if(newPassword !== '')
  {
    if (!isPassword.test(newPassword)) {
      error.push({
        key: "newPassword",
        err: `Invalid. Minimum eight characters, at least one letter and one number`,
      });
    }
  }
  

  if (error.length > 0) {
    return res.status(400).json({
        error,
    });
  } else {
    next();
  }
};
