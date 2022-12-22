const Category = require('../models/Category')
const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
class AdminController {

    //[GET]
    index(req, res, next) {
        res.render('admin/dashboard')
    }

    //[GET]
    users(req, res, next) {
        res.render('admin/user')
    }

    //[GET]
    async products(req, res, next) {
        const categories = await Category.find({});
        res.render('admin/product', { categories })
    }

    //[GET]
    async productsByCategory(req, res, next) {
        let id = req.params.categoryId;
        const categories = await Category.find({});
        const category = await Category.findById(id)
        res.render('admin/product/productByCategory', { categories, category })
    }

    //[GET]
    async productDetail(req, res, next)
    {
        res.render('admin/productDetail')
    }

    //[GET]
    async categories(req, res, next) {
        const categories = await Category.find({});
        res.render('admin/category', { categories })
    }

    //[GET]
    async invoice(req, res, next) {
        res.render('admin/invoice')
    }

    //[GET]
    async invoiceDetails(req, res, next) {
        let orderId = req.params.orderId;
        console.log(orderId);
        const order = await Order.findById(orderId);
        const orderDetails = await OrderDetail.find({  orderId });
        console.log(orderDetails);
        res.render('admin/invoice_detail', { order, orderDetails }) 
    }
}

module.exports = new AdminController();