const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  expiryDate: { type: String },
  mfgDate: { type: String },
  rackNo: { type: String },
  roomTemp: { type: Number },
  batchNo: { type: String },
  createdAt: { type: String },
  productImage: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
