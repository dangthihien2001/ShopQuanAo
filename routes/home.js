const express = require("express");
const router = express.Router();
const authTokenMiddleware = require("../middlewares/authTokenMiddleware");
const checkStatusOrderMiddleware = require("../middlewares/checkStatusOrderMiddleware")
const homeController = require("../controllers/HomeController");
router.route("/").get(homeController.index);
router.route("/cart").get(homeController.cart);

router.route("/trackingOrder").get(homeController.trackingOrder);

router.route("/shop").get(homeController.shopPage);
router.route("/contact").get(homeController.contact);
router.route("/aboutMe").get(homeController.aboutMe);

router.route("/checkout").get(authTokenMiddleware, homeController.checkout);

router.route("/payment/:orderId").get(checkStatusOrderMiddleware, homeController.payment);

router.route("/thankyou/:orderId").get(homeController.thankyou);

module.exports = router;
