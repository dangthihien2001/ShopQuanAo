const JWT = require('jsonwebtoken');

const endcodedToken = (data, secret) => {
    return JWT.sign({
        iss:'Dinh Hung',
        sub: data, // là 1 cái gì đó độc nhất ví dụ như id 
        iat: new Date().getTime() //ngày phát hành
    }, secret)
}

module.exports = endcodedToken;