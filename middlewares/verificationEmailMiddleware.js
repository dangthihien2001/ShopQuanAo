const User = require('../models/User');
module.exports = async (req, res, next) => {
    try{
        req.userId = decoded.sub;
        next();
    }
    catch(err)
    {
       res.redirect('/auth/login')
    }
    
}