const mongoose = require("mongoose");
const {Schema} = mongoose;
var uniqueValidator = require('mongoose-unique-validator');


const brandSchema = new Schema({
    brand: {
        type: String,
        unique: true 
      },
    description: String,
    brandImg: String
})

brandSchema.plugin(uniqueValidator);

module.exports = mongoose.model('brands', brandSchema);