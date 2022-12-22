const isEmail = require('../public/assets/regex/isEmail');
const isPassword = require('../public/assets/regex/isPassword');
const isPhoneNumber = require('../public/assets/regex/isPhoneNumber');
module.exports = (req, res, next) => {
  const { username, phoneNumber, email, password } = req.body;
  const data = { username, phoneNumber, email, password };
  let error = [];

  for (key in data) {
    if (data[key] === "") {
      error.push({
        key,
        err: `${key} is require`,
      });
    }
  }


  if(email !== '')
  {
    if(!isEmail.test(email))
    {
      error.push({
        key: 'email',
        err: `${email} is invalid`,
      });
    }
  }

  if(phoneNumber !== ''){
    if(!isPhoneNumber.test(phoneNumber))
    {
      error.push({
        key: 'phoneNumber',
        err: `${phoneNumber} is invalid. Must be number and 10 characters or more`,
      });
    }
  }

  if(password !== '')
  {
    if(!isPassword.test(password))
    {
      error.push({
        key: 'password',
        err: `Invalid. Minimum eight characters, at least one letter and one number`
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
