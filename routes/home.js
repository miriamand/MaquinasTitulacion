var express = require('express');
var router = express.Router();
const Brands = require("../models/brands")
const Category = require("../models/category")
const Product = require("../models/products")

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
  res.render('addbrand');
});
router.get('/brandlist',isAuthenticated, async(req, res) => {
  try {
    let registros = await Brands.find().exec();
    res.render("brandlist",{brands:registros})
    console.log(registros); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
}
});
router.get('/addproduct', async(req, res, next) => {
  let registroC = await Category.find().exec();
  let registroB = await Brands.find().exec();

  res.render("addproducts",{category:registroC,brands:registroB});
});
router.get('/productlist',isAuthenticated, async(req, res) => {
  try {

    let registroP = await Product.find().exec();

    res.render("productlist",{prods:registroP})
    console.log(registroP); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
    console.log(registroP);
}
});
router.get('/addcategory',isAuthenticated, (req, res) => {
  res.render('addcategory');
});
router.get('/categorylist',isAuthenticated, async(req, res) => {
  try {
    let registros = await Category.find().exec();
    res.render("categorylist",{category:registros})
    console.log(registros); // puede tener registros o un array vacío
}
catch(e) {
    console.error(e);
}
});





module.exports = router;
