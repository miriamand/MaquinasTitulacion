const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
    fullname: { 
      type: String,
    required: [true, 'Name field is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email field is required']
    },
    password:{
      type: String,
      required: [true, 'Password field is required']
    }
})

userSchema.methods.encryptPassword = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

userSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password,this.password)
};


module.exports = mongoose.model('users', userSchema);