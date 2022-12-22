const JWT = require('jsonwebtoken');

const decodedToken = (token, secret) => JWT.verify(token, secret)

module.exports = decodedToken;