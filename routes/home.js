var express = require('express');
var router = express.Router();
const Brands = require("../db/models/brands")
const Category = require("../db/models/category")
const Product = require("../db/models/products")
const Swal = require('sweetalert2')
const fs = require('fs')

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

/* POST */
router.post('/addbrand', isAuthenticated, function(req, res, next) {
  console.log(req.body)
  let data = req.body
  const newBrand = new Brands(data);
  newBrand.save()
    .then(savedBrand => {
      req.flash('successMessage', "Marca registrada")
      res.redirect("/home/brandlist")
    })
    .catch(error => {
      req.flash('failureMessage', "Marca ya existe")
      res.redirect("/home/addbrand")
    });
});

router.post('/editbrand/:id', isAuthenticated, function(req, res, next) {
  console.log(req.body)
  let data = req.body
  Brands.findByIdAndUpdate(req.params.id, data)
    .then(updatedBrand => {
      req.flash('successMessage', "Marca actualizada")
      res.redirect("/home/brandlist")
    })
    .catch(error => {
      req.flash('failureMessage', "Error al actualizar la marca")
      res.redirect("/home/brandlist")
    });
});

// router.post('/deletebrand/:id', async(req, res, next) => {
  
// })

router.delete('/home/deletebrands/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    // Delete the item with the given ID using Mongoose or your preferred method
    const deletedBrand = await Brands.findByIdAndRemove(itemId);

    if (!deletedBrand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.sendStatus(200); // Send a success status code
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Send an error status code
  }
});


  


  

router.post('/addcategory', isAuthenticated, function(req, res, next) {
  console.log(req.body)
  let data = req.body
  const newCategory = new Category(data);
  newCategory.save()
    .then(savedCategory => {
      req.flash('successMessage', "Registrada")
      res.redirect("/home/addcategory")
    })
    .catch(error => {
      req.flash('failureMessage', "Ya existe")
      res.redirect("/home/addcategory")
    });
});

router.post('/updatecategory/:id', isAuthenticated, function(req, res, next) {
  console.log(req.body)
  let data = req.body
  Category.findByIdAndUpdate(req.params.id, data)
    .then(updatedCategory => {
      req.flash('successMessage', "Categoría actualizada")
      res.redirect("/home/categorylist")
    })
    .catch(error => {
      req.flash('failureMessage', "Error al actualizar la categoría")
      res.redirect("/home/categorylist")
    });
});

router.post('/deletecategory/:id', isAuthenticated, function(req, res, next) {
  res.send()
  // Category.findByIdAndRemove(req.params.id)
  //   .then(() => {
  //     req.flash('successMessage', "Categoría eliminada")
  //     res.redirect("/home/categorylist")
  //   })
  //   .catch(error => {
  //     req.flash('failureMessage', "Error al eliminar la categoría")
  //     res.redirect("/home/categorylist")
  //   });
});


router.post('/addproduct', function(req, res, next) {
  
  let data = req.body;
;
    data.image = {
      originalname:req.file.originalname,
      mimetype:req.file.mimetype,
      filename:req.file.filename,
      size:req.file.size

    };

  const newProduct = new Product(data);
  newProduct.save()
    .then(savedProduct => {
      req.flash('successMessage', "Product registered successfully");
      res.redirect("/home/addproduct");
    })
    .catch(error => {
      req.flash('failureMessage', "Product already exists");
      res.redirect("/home/addproduct");
    });
});

router.post('/editproduct/:id', isAuthenticated, function(req, res, next) {
  console.log(req.body)
  let data = req.body
  Product.findByIdAndUpdate(req.params.id, data)
    .then(updatedProduct => {
      req.flash('successMessage', "Producto actualizado")
      res.redirect("/home/productlist")
    })
    .catch(error => {
      req.flash('failureMessage', "Error al actualizar el producto")
      res.redirect("/home/productlist")
    });
});

router.post('/deleteproduct/:id', isAuthenticated, function(req, res, next) {
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      req.flash('successMessage', "Producto eliminado")
      res.redirect("/home/productlist")
    })
    .catch(error => {
      req.flash('failureMessage', "Error al eliminar el producto")
      res.redirect("/home/productlist")
    });
});

/* GET */
router.get('/addbrand', isAuthenticated, (req, res) => {
  res.render('./adds/addbrand');
});
router.get('/editbrand/:id', async(req, res) => {
  try {
    let registros = await Brands.find({ _id: req.params.id }).exec();
    res.render('./edit/editbrand', { brands: registros[0] });
    console.log(registros); // puede tener registros o un array vacío
  } catch (e) {
    console.error(e);
  } 
});
router.get('/editproduct/:id', async(req, res) => {
  try {
    let registros = await Product.find({ _id: req.params.id }).exec();
    let registroC = await Category.find().exec();
    let registroB = await Brands.find().exec();


    res.render('./edit/editproduct', { prods: registros[0], category: registroC, brands: registroB });
    console.log(registros); 
  } catch (e) {
    console.error(e);
  } 
});


router.get('/brandlist', async(req, res) => {
  try {
    let registros = await Brands.find().exec();
    res.render("./lists/brandlist", { brands: registros })
    console.log(registros); 
  } catch (e) {
    console.error(e);
  }
});

router.get('/addproduct', async(req, res, next) => {
  let registroC = await Category.find().exec();
  let registroB = await Brands.find().exec();

  res.render("./adds/addproducts", { category: registroC, brands: registroB });
});

router.get('/productlist', async(req, res) => {
  try {
    let registroP = await Product.find().exec();

    res.render("./lists/productlist", { prods: registroP })
    console.log(registroP); // puede tener registros o un array vacío
  } catch (e) {
    console.error(e);
    console.log(registroP);
  }
});

router.get('/products-details/:id', async(req, res) => {
  try {
    let registros = await Product.find({ _id: req.params.id }).exec();
    res.render('product-details', { prods: registros[0]});
    console.log(registros); 
  } catch (e) {
    console.error(e);
  } 
});
router.get('/addcategory', isAuthenticated, (req, res) => {
  res.render('./adds/addcategory');
});

router.get('/addsales', isAuthenticated, (req, res) => {
  res.render('./adds/addsales');
});

router.get('/categorylist', isAuthenticated, async(req, res) => {
  try {
    let registros = await Category.find().exec();
    res.render("./lists/categorylist", { category: registros })
    console.log(registros); // puede tener registros o un array vacío
  } catch (e) {
    console.error(e);
  }
});

router.get('/saleslist', async(req, res) => {
  res.render("./lists/saleslist");
});

module.exports = router;
