var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport')
const Product = require("../db/models/products")

// Define the routes
router.get('/', (req, res) => {
  res.render('signin');
});

router.post('/',passport.authenticate('local-signin',{
  successRedirect:'/home',
  failureRedirect:'/',
  passReqToCallback: true
}))

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/home',
  failureRedirect:'/signup',
  passReqToCallback: true
}))

router.get('/logout',(req,res,next) =>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
res.redirect('/')
}


router.get('/home',isAuthenticated, async(req, res) => {
 try {
    let registros = await Product.find().exec();
    res.render("index",{prods:registros})
    console.log(registros); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
}
});




module.exports = router;
