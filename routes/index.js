var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport')

// Define the data
const inventory = [
  { id: 1, brand: 'Brother', model: 'XM2701', quantity: 10 },
  { id: 2, brand: 'Singer', model: '4423', quantity: 5 },
  { id: 3, brand: 'Janome', model: 'Sewing 725S', quantity: 3 }
];

// Define the routes
router.get('/', (req, res) => {
  res.render('signin', { inventory });
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

router.get('/home',isAuthenticated, (req, res) => {
  res.render('index');
});

router.get('/productlist', (req, res) => {
  res.render('productlist');
});

router.post('/add', (req, res) => {
  const { brand, model, quantity } = req.body;
  const id = inventory.length + 1;
  inventory.push({ id, brand, model, quantity });
  res.redirect('/');
});


 function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
res.redirect('/')
}

//router.use((req,res,next)=>{
//   isAuthenticated(req,res,next);
//   next();
// })


module.exports = router;
