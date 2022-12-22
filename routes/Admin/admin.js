const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/AdminController");
router.route("/dashboard").get(adminController.index);


//user 

router.route("/users").get(adminController.users);


//category
router.route("/categories").get(adminController.categories);


//products 
router.route("/products").get(adminController.products);


//products by category
router.route("/:categoryId/products").get(adminController.productsByCategory);

//invoice 
router.route("/invoice").get(adminController.invoice)

router.route("/invoice/:orderId").get(adminController.invoiceDetails)


module.exports = router;