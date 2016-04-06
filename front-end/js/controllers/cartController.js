angular
  .module("wdi_p4")
  .controller("CartController", CartController);

CartController.$inject = ['Cart', 'cartService'];
function CartController(Cart, cartService) {
  var self = this;

  this.cart = Cart.get({ id: cartService.getId() });

  this.cartTotal = cartService.cartTotal();

  

  self.removeFromCart = function(product) {
    console.log(product);
    cartService.remove(product);
    
  }

}