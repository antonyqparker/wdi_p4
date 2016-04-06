angular
  .module('wdi_p4')
  .service('cartService', CartService);

CartService.$inject = ['Cart', 'tokenService', '$window', '$rootScope'];
function CartService(Cart, tokenService, $window, $rootScope) {

  var cartId = $window.localStorage.getItem('cartId');
  var products = [];

  if(cartId) {
    Cart.get({ id: cartId }, function(cart) {
      cart.products.forEach(function(product) {
        products.push(product);
      });
      $rootScope.$broadcast('cart:update');
    })
  } else {
    Cart.save({ products: [] }, function(cart) {
      $window.localStorage.setItem('cartId', cart._id);
      cartId = cart._id;
      $rootScope.$broadcast('cart:update');
    });
  }

  function updateCart() {
    Cart.update({ id: cartId }, { products: products }, function() {
      $rootScope.$broadcast('cart:update');
    });
  }

  return {
    add: function(product) {
      products.push(product._id);
      updateCart();
    },

    remove: function(product) {
      console.log("removing");
      var idx = products.indexOf(product._id);
      console.log(products)
      console.log(idx);
      if(idx > -1) {
        products.splice(idx, 1);
        updateCart();
      }
    },

    getProductCount: function() {
      return products.length;
    },

    clear: function() {
      products = [];
      updateCart();
    },

    getId: function() {
      return cartId;
    },

    cartTotal:function(){
      return products.reduce(function(sum, cartItem){
              return cartItem.price + sum;
            }, 0)
    }
  }
}