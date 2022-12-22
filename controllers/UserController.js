const User = require('../models/User');
const Account = require('../models/Account');
class UserController {

     //[GET]
    async index(req, res, next){
        const user = await User.findById(req.userId);
        const account = await Account.findOne({ userId : user._id });
        if(user && account){
            res.render('home/user/personal_information', {
                user,
                account
            })
        }
        
        else{
            res.redirect('/')
        }
       
    }

    //[GET]
    getListUser(req, res, next){
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Account.find().skip((perPage * page) - perPage).limit(perPage).populate('userId').exec((err, accounts) => {
            Account.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    accounts,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

     //[GET]
    async getUser(req, res, next)
    {
            const user = await User.findById(req.userId);
            
            if(user)
            {
                return res.status(200).json({
                    user
                })
            }
            else{
                return res.status(400).json({
                    message: "Not found"
                })
            }
    }

     //[PUT]
    async update (req, res, next){
        const { username, phoneNumber } = req.body;
        const user = await User.findOneAndUpdate({ _id : req.userId}, {
            userName : username,
            phoneNumber
        }, { new : true });
        if(user)
        {
            return res.status(200).json({
                message: "Updated successfully",
                user
            })
        }
        else {
            return res.status(400).json({
                message: "Updated fail"
            })
        }
    }

}

module.exports = new UserController();