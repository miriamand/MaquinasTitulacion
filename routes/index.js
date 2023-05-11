var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Define the data
const inventory = [
  { id: 1, brand: 'Brother', model: 'XM2701', quantity: 10 },
  { id: 2, brand: 'Singer', model: '4423', quantity: 5 },
  { id: 3, brand: 'Janome', model: 'Sewing 725S', quantity: 3 }
];

// Define the routes
router.get('/', (req, res) => {
  res.render('index', { inventory });
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


module.exports = router;
