const decodedToken = require('../helper/decodedToken');
const config = require('../configs/auth.config');
const Product = require('../models/Product')
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Account = require('../models/Account');
const Category = require('../models/Category');
class HomeController {
    //[GET] index
    async index(req, res, next){
        let countMenShirt = await Product.countDocuments({ categoryId: '625f64e0d21cd8ab0b711f06'});
        let countMenWomenShirt = await Product.countDocuments({ categoryId: '625f64e0d21cd8ab0b711f06'});
        let countSweater = await Product.countDocuments({ categoryId: '625f6558d21cd8ab0b711f0c'})
        let countTShirt = await Product.countDocuments({ categoryId: '625f6411d21cd8ab0b711efa'})
        let products = await Product.find({}).populate('categoryId').limit(8);
        console.log(products);
        return res.render('home/index', {countMenShirt, countSweater, countMenWomenShirt, countTShirt, products})
    }

    async shopPage(req, res, next)
    {
        let countMenShirt = await Product.countDocuments({ categoryId: '625f64e0d21cd8ab0b711f06'});
        let countMenWomenShirt = await Product.countDocuments({ categoryId: '625f64e0d21cd8ab0b711f06'});
        let countSweater = await Product.countDocuments({ categoryId: '625f6558d21cd8ab0b711f0c'})
        let countTShirt = await Product.countDocuments({ categoryId: '625f6411d21cd8ab0b711efa'})
        let products = await Product.find({}).populate('categoryId').limit(8);
        let category = await  Category.find({});
        //console.log(products);

        return res.render('home/shop', {countMenShirt, countSweater, countMenWomenShirt, countTShirt, products,category})
    }

    async cart(req, res, next) {
        return res.render('home/cart/index')
    }

    async trackingOrder(req, res, next) {
        return res.render('home/trackingOrder')
    }

    async checkout(req, res, next) {
        let id = req.userId;
        const account = await Account.findOne({userId: id});
        return res.render('home/checkout', { account })
    }

    async contact(req, res, next) {
        return res.render('home/contact')
    }

    async aboutMe(req, res, next) {
        return res.render('home/aboutMe')
    }

    async payment(req, res, next)
    {
        let orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        const orderDetails = await OrderDetail.find({ orderId })
        res.render('home/payment', {
            order,
            orderDetails,
            paypalClientId: `${process.env.PAYPAL_CLIENT_ID}`
        })
    }

    async thankyou(req, res, next) {
        const { orderId }  = req.params;
        const order = await Order.findById(orderId);
        if(order.status == "1")
        {
            try{
                order.status = "2";
                await order.save()
                const orderDetails = await OrderDetail.find({ orderId });
                if(orderDetails)
                {
                    orderDetails.forEach(async (item) => {
                        const product = await Product.findById(item.productId);
                        let stock = product.stock - item.quantity;
                        product.stock = stock;
                        await product.save()
                    })
                }
            }
            catch(error){
                res.status(500).json({error: error.message});
            }
        }
        
        res.render("home/thankyou")
    }
}
module.exports = new HomeController();