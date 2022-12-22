const decodedToken = require('../helper/decodedToken');
const config = require('../configs/auth.config');
module.exports = async (req, res, next) => {
    try{
        var decoded = decodedToken(req.session.token, config.secret_user);
        req.userId = decoded.sub;
        next();
    }
    catch(err)
    {
       res.redirect('/auth/login')
    }
    
}