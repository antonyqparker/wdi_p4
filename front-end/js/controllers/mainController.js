angular
  .module("wdi_p4")
  .controller("MainController", MainController);

MainController.$inject = ['Product', 'cartService', '$scope'];
function MainController(Product, cartService, $scope) {
  var self = this;

  $scope.$on('cart:update', function() {
    self.productCount = cartService.getProductCount();
  })

  self.products = Product.query();
  self.productCount = cartService.getProductCount();

  self.addToCart = function(product) {
    cartService.add(product);
  }
}