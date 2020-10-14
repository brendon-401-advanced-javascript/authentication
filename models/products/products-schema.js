'use strict';

const mongoose = require('mongoose');
// require('mongoose-schema-jsonschema')(mongoose);

const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: false },
  category: { type: String, required: false },
  inStock: { type: Number, required: false },
});

module.exports = mongoose.model('products', products);