const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    nameProduct: {
      type: String,
      required: true,
      unique: true,
    },
    prices: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    productImage : {
      type: String
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  });
  
  const Product = mongoose.model("Product", ProductSchema);
  module.exports = Product;