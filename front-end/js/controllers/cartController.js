angular
  .module("wdi_p4")
  .controller("CartController", CartController);

CartController.$inject = ['Cart', 'User', 'tokenService', 'cartService', '$scope'];
function CartController(Cart, User, tokenService, cartService, $scope) {
  var self = this;

  $scope.makePayment = false;
  this.currentUser = null;

  if(!!tokenService.getUser()) {
    User.get({ id: tokenService.getUser()._id }, function(user) {
      console.log(user);
      self.currentUser = user;
    });
  }

  var steps = !!tokenService.getUser() ? ['cart', 'shipping', 'payment'] : ['cart', 'register', 'shipping', 'payment'];
  var currentStepIdx = 0;

  this.step = steps[currentStepIdx];

  this.nextStep = function() {
    currentStepIdx++
    this.step = steps[currentStepIdx];
    console.log(this.step);
  }

  this.prevStep = function() {
    currentStepIdx--
    this.step = steps[currentStepIdx];
    console.log(this.step);
  }
  
  this.cart = Cart.get({ id: cartService.getId() });

  this.cartTotal = cartService.cartTotal();

  this.addVat = this.cartTotal * 1.1;

  self.clearCart = function (){
    cartService.clearCart()
  }

  self.removeFromCart = function(product, index) {
    cartService.remove(product, index);
  }

  // this.cartShow = function() {
  //   console.log("PING");
  //   self.showForm = true;
  //   self.showCart = false;
  //   console.log("SHOWFORM: ", self.showForm);
  // }
}