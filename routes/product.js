var express = require('express');
var router = express.Router();
const Product = require('../schema/product');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  let product = await productSchema.find();
  res.send(product);
});

router.post('/', async function(req, res, next) {
  let newProduct = productSchema(req.body);
  await newProduct.save()
  res.send(newProduct);
});

module.exports = router;
