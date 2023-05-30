var express = require('express');
var router = express.Router();
const Brands = require("../db/models/brands")
const Category = require("../db/models/category")
const Product = require("../db/models/products")

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
res.redirect('/')
}

/* POST */
router.post('/addbrand',isAuthenticated, function(req, res, next){
  console.log(req.body)
  let data = req.body
  const newBrand = new Brands(data);
  newBrand.save()
    .then(savedBrand => {
      req.flash('successMessage',"Marca registrada")
      res.redirect("/home/addbrand")
    })
    .catch(error => {
      req.flash('failureMessage',"Marca ya existe")
      res.redirect("/home/addbrand")
    });
});
router.post('/addcategory',isAuthenticated, function(req, res, next){
  console.log(req.body)
  let data = req.body
  const newCategory = new Category(data);
  newCategory.save()
    .then(savedCategory => {
      req.flash('successMessage',"Registrada")
      res.redirect("/home/addcategory")
    })
    .catch(error => {
      req.flash('failureMessage',"Ya existe")
      res.redirect("/home/addcategory")
    });
});
router.post('/addproduct',isAuthenticated, function(req, res, next){
  console.log(req.body)
  let data = req.body
  const newProduct = new Product(data);
  newProduct.save()
    .then(savedproduct => {
      req.flash('successMessage',"Registrada")
      res.redirect("/home/addproduct")
    })
    .catch(error => {
      req.flash('failureMessage',"Ya existe")
      res.redirect("/home/addproduct")
    });
});


/* GET */
router.get('/addbrand',isAuthenticated, (req, res) => {
  res.render('./adds/addbrand');
});
router.get('/brandlist',isAuthenticated, async(req, res) => {
  try {
    let registros = await Brands.find().exec();
    res.render("./lists/brandlist",{brands:registros})
    console.log(registros); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
}
});
router.get('/addproduct', async(req, res, next) => {
  let registroC = await Category.find().exec();
  let registroB = await Brands.find().exec();

  res.render("./adds/addproducts",{category:registroC,brands:registroB});
});
router.get('/productlist',isAuthenticated, async(req, res) => {
  try {

    let registroP = await Product.find().exec();

    res.render("./lists/productlist",{prods:registroP})
    console.log(registroP); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
    console.log(registroP);
}
});
router.get('/addcategory',isAuthenticated, (req, res) => {
  res.render('./adds/addcategory');
});
router.get('/addsales',isAuthenticated, (req, res) => {
  res.render('./adds/addsales');
});
router.get('/categorylist',isAuthenticated, async(req, res) => {
  try {
    let registros = await Category.find().exec();
    res.render("./lists/categorylist",{category:registros})
    console.log(registros); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
}
});
router.get('/saleslist', async(req, res) => {

    res.render("./lists/saleslist")
    
});







module.exports = router;
