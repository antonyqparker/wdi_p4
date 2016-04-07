angular
  .module('wdi_p4')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', 'API_URL', 'cartService', '$scope'];
function PaymentController($http, API_URL, cartService, $scope) {

  var self = this;

  $scope.hide = true

  self.card = {};
  self.payee = null;
  self.amount = cartService.cartTotal(); 
  self.currency = "aud"; 
  self.paymentSuccessful = false;

  self.pay = function() {
    Stripe.card.createToken(self.card, function(status, response) {
      if(status === 200) {
        var data = {
          card: self.card,
          token: response.id,
          amount: self.amount,
          currency: self.currency,
          payee: self.payee
        };

        $http
          .post(API_URL + '/payment', data)
          .then(function(res) {
            if(res.status === 200) {
              self.paymentSuccessful = true;
            }
            else {
              self.paymentSuccessful = false;
            }
          });
      }
    });
  }

  self.reset = function() {
    self.card = {};
    self.payee = "";
    self.amount = null;
    self.paymentSuccessful = false;
    self.Form.$setPristine(true);
    // use vanilla JS to reset form to remove browser's native autocomplete highlighting
    document.getElementsByTagName('form')[0].reset();
  }
}