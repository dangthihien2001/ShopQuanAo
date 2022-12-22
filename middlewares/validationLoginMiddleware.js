const isEmail = require('../public/assets/regex/isEmail');
const isPassword = require('../public/assets/regex/isPassword');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const data = { email, password };
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