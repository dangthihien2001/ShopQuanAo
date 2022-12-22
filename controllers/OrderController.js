const Order = require("../models/Order")
const Account = require("../models/Account")
class OrderController {
    async getOrderList(req, res, next) {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Order.find().skip((perPage * page) - perPage).limit(perPage).exec((err, orders) => {
            Order.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    count,
                    orders,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    async getOrderByUser(req, res, next) {
        const account = await Account.findOne({userId :req.userId})
        let perPage = 1; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Order.find({ email: account.email }).skip((perPage * page) - perPage).limit(perPage).exec((err, orders) => {
            Order.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    count,
                    orders,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    async cancelOrder(res, req, next) {

    }
}

module.exports = new OrderController();