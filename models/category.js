const mongoose = require("mongoose");
const {Schema} = mongoose;
var uniqueValidator = require('mongoose-unique-validator');


const categorySchema = new Schema({
    category: {
        type: String,
        unique: true 
      },
    code: Number,
    description: String
})

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('categories', categorySchema);