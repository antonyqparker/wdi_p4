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
      products.push(product);
      updateCart();
    },

    remove: function(product, id) {
      products.splice(id, 1);
      updateCart();
    },

    getProductCount: function() {
      return products.length;
    },

    clearCart: function() {
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
    },

    addVat:function(){
      var total = products.reduce(function(sum, cartItem){
              return cartItem.price + sum;
            }, 0)
      var vat = total * 0.10;
      var addVat = total + vat;
      return addVat;
    }
  }
}
