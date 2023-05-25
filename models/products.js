const mongoose = require("mongoose");
const {Schema} = mongoose;
var uniqueValidator = require('mongoose-unique-validator');


const productSchema = new Schema({
    product: {
        type: String,
        unique: true 
      },
    category: String,
    brand: String,
    SKU:Number,
    description: String,
    quantity:Number,
    price:Number,
})

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('products', productSchema);