const Product = require("../models/Product")
class ProductController {

    //[GET]
    getProducts(req, res, next) {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        Product.find().skip((perPage * page) - perPage).limit(perPage).populate('categoryId').exec((err, products) => {
            Product.countDocuments((err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    products,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    //[GET]
    getProductsByCategory(req, res, next)
    {
        let perPage = 5; //số lượng hiển thị trên 1 trang
        let page = Number(req.params.page) || 1;
        let categoryId = req.params.categoryId;
        Product.find({ categoryId }).skip((perPage * page) - perPage).limit(perPage).populate('categoryId').exec((err, products) => {
            Product.countDocuments({ categoryId }, (err, count) => {
                if (err) return res.status(500).json({ error : err });
                return res.status(200).json({
                    products,
                    currentPage: page, //trang hiện tại
                    totalPages: Math.ceil(count / perPage) // tổng số trang
                })
            });
        })
    }

    //[POST]
    async create(req, res, next){
        const file = req.file;
        let image;
        console.log(file);
        if(file)
        {
            image = file.filename
        }
        else {
            image = '';
        }
        const {nameProduct, prices, stock, categoryId } = req.body;
        try{
            await Product.create({ nameProduct, prices, stock, categoryId, productImage : image })
            return res.status(201).json({
                message : "Create product successfully"
            })
        }
        catch(err) {
            return res.status(400).json({
                message : err
            })
        }
    }

    //[PUT]
    async update(req, res, next){
        const {id, nameProduct, prices, stock, categoryId} = req.body;
        console.log(stock);
        const file = req.file;
        if(file)
        {
            try {
                const product = await Product.findOneAndUpdate({ _id : id}, {
                    nameProduct,
                    prices,
                    stock,
                    categoryId,
                    productImage : file.filename
                }, { new : true }).populate("categoryId")

                return res.status(200).json({
                    message : "Update product successfully",
                    product
                })
            } catch (err) {
                return res.status(400).json({
                    message : err
                })
            }
            
        }
        else {
            try {
                const product = await Product.findOneAndUpdate({ _id : id}, {
                    nameProduct,
                    prices,
                    stock,
                    categoryId,
                }, { new : true })
                return res.status(200).json({
                    message : "Update product successfully",
                    product
                })
            } catch (err) {
                return res.status(400).json({
                    message : err
                })
            }
        }

    }
}

module.exports = new ProductController();