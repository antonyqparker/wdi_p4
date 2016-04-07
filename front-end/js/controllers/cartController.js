angular
  .module("wdi_p4")
  .controller("CartController", CartController);

CartController.$inject = ['Cart', 'cartService'];
function CartController(Cart, cartService) {
  var self = this;

  this.cart = Cart.get({ id: cartService.getId() });

  this.cartTotal = cartService.cartTotal();

  this.addVat = this.cartTotal * 1.1;

  self.clearCart = function (){
    cartService.clearCart()
  }

  self.removeFromCart = function(product, index) {
    cartService.remove(product, index);
  }
}