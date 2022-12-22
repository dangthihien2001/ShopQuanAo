const Category = require("../models/Category")
class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const category = await Category.find({});

            if(category)
            {
                return res.status(200).json({
                    message: "GET Successfully",
                    category
                })
            }
            
        }
        catch (err) {
            return res.status(400).json({
                message: "Get fail",
                err
            })
        }
    }
    //[POST]
    async create(req, res, next) {
        const { nameCategory, brand } = req.body;
        try{
            const category = await Category.create({ nameCategory, brand });
            return res.status(201).json({
                message: "Created Successfully",
                category
            })
        }
        catch(err) {
            return res.status(400).json({
                message: "Create fail",
                err
            })
        }
        
    }

    //[PUT]
    async update(req, res, next) {
        const { id, nameCategory, brand } = req.body;
        const category = await Category.findOneAndUpdate({ _id : id}, {
            nameCategory,
            brand
        }, { new : true });
        
        if(category)
        {
            return res.status(200).json({
                message: "Updated successfully",
                category
            })
        }
        else {
            return res.status(400).json({
                message: "Updated fail"
            })
        }
    }
}

module.exports = new CategoryController();