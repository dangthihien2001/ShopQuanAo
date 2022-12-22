const express = require("express");
const router = express.Router();

const CategoryController = require('../../controllers/CategoryController')
const UserController = require('../../controllers/UserController')
const ProductController = require('../../controllers/ProductController')
const CheckoutController = require('../../controllers/CheckoutController')
const OrderController = require('../../controllers/OrderController')
const authTokenMiddleware = require('../../middlewares/authTokenMiddleware')
//Middleware
const upload = require('../../middlewares/uploadMiddleware')


// route [api/users]
// verify role
router.route('/users/:page')
    .get(UserController.getListUser)



// route [api/category]
// verify role
router.route('/categories')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.create)
    .put(CategoryController.update)

// route [api/products/:page]
router.route('/products/:page').get(ProductController.getProducts) // lấy tất cả ko cần phụ thuộc category

// route [api/products]
router.route('/products')
    .post(upload.single('image'), ProductController.create)
    .put(upload.single('image'), ProductController.update)



// route [api/:categoryId/products/:page]
router.route('/:categoryId/products/:page').get(ProductController.getProductsByCategory)

// route [api/orders/:page]
router.route('/orders/:page').get(OrderController.getOrderList)


// route [api/checkout]
router.route('/checkout').post(CheckoutController.order)

// route [api/transaction/:orderId]
router.route('/transaction/:orderId').post(CheckoutController.transaction)

// route [api/ordersByUser/:page]
router.route('/ordersByUser/:page').get(authTokenMiddleware, OrderController.getOrderByUser);
module.exports = router;