const Account = require('../../models/Account')

class AccountController {
    //[PUT]
    async changePassword(req, res, next) {
        const { newPassword } = req.body;
        const account = await Account.findOne({ userId : req.userId});
        
        account.password = newPassword;
        account.save((err, account) => {
            if (err) {
                return res.status(500).send({ message: err }); 
            }
            else {
                return res.status(200).send({ 
                    message: "Updated successfully",
                    account
                })
            }
        });
    }
}

module.exports = new AccountController();