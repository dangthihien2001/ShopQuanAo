const User = require("../../models/User");
const Account = require("../../models/Account");
const nodemailer = require("../../configs/nodemailer.config");
const endcodedToken = require("../../helper/encodedToken");
const config = require('../../configs/auth.config');

class RegisterController {
  //[GET] 
  index(req, res, next) {
    res.render("home/register");
  }
  
  //[POST] create
  async create(req, res, next) {
    console.log(req.body);
    const { username, phoneNumber, email, password } = req.body;
    const foundEmail = await Account.findOne({ email });
    if (foundEmail)
      return res.status(403).json({
        error: [{ key: "email", err: " Email is already in use " }],
      });

    const activation_code = endcodedToken(email, config.secret_email);
    
    const user = await User.create({
      userName: username,
      phoneNumber,
    });

    const token_sceret = endcodedToken(user._id, config.secret_user);

    await Account.create({
      email,
      password,
      userId: user._id,
      token_sceret,
      activation_code
    });

    req.session.token = token_sceret;
    userGlobal = user;

    nodemailer.sendConfirmationEmail(username, email, activation_code);
    return res.status(200).json({
      message: "OK"
    })
  }

  
  //[PUT]
  async verifyAccount(req, res, next) {
    const account = await Account.findOneAndUpdate({
      activation_code: req.params.activation_code
    }, { status : true })

    if(account)
    {
      req.session.token = account.token_sceret;
      const user = await User.findById(account.userId);
      if(user)
      {
        userGlobal = user;
      }
      else {
        return res.status(404).send({ message: "User not found "})
      }
      return res.redirect('/');
    }
    else{
      return res.status(404).send({ message: "Account not found "})
    }
  }


}

module.exports = new RegisterController();
