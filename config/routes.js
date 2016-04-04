var router = require('express').Router();
var usersController = require('../controllers/users.js');
var productsController = require('../controllers/products.js');
var cartsController = require('../controllers/carts.js')
var authenticationController = require('../controllers/authentication.js')

//Product routes
router.route('/products')
  .get(productsController.index)
  .post(productsController.create);

router.route('/products/:id')
  .get(productsController.show)
  .put(productsController.update)
  .delete(productsController.delete);

//User routes
router.route('/users')
  .get(usersController.index)
  .post(usersController.create);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

//cart routes
router.route('/cart')
  .post(cartsController.create);


router.route('/cart/:id')
  .get(cartsController.show)
  // .put(cartsController.update)
  // .delete(cartsController.delete);

//Authentication
router.post('/login', authenticationController.login)
router.post('/register', authenticationController.register);

module.exports = router;