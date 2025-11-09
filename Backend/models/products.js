const mongoose = require('mongoose');

const mustHaveSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  discount: String,
  previous_mrp: Number,
  image: String,
  pack_size: String,
  description: String,
  dosage: String,
  stock: String,
  key_benefits: [String]
});

module.exports = mongoose.model('allproducts', mustHaveSchema);