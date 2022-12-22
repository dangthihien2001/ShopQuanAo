const isPhoneNumber = require('../public/assets/regex/isPhoneNumber');
module.exports = (req, res, next) => {
  const { username, phoneNumber } = req.body;
  const data = { username, phoneNumber};
  let error = [];

  for (key in data) {
    if (data[key] === "") {
      error.push({
        key,
        err: `${key} is require`,
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

  if (error.length > 0) {
    return res.status(400).json({
        error,
    });
  } else {
    next();
  }
};