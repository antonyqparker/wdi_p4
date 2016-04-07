angular
  .module('wdi_p4', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API_URL', 'http://localhost:3000/api')
  .config(Router)
  .config(InterceptorConfig)
  .config(function() {
    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  });

InterceptorConfig.$inject = ['$httpProvider'];
function InterceptorConfig($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor')
}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', { 
      url: '/',
      templateUrl: 'partials/home.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/register.html',
      controller: 'UsersController as users'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'UsersController as users'
    })
    .state('products', {
      url: '/products',
      templateUrl: 'partials/products.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: 'partials/cart.html',
      controller: 'CartController as cartCtrl'
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'partials/checkout.html'
    })
    .state('payment', {
      url: '/payment',
      templateUrl: 'partials/payment.html',
      controller: 'PaymentController as payment'
    })


  $urlRouterProvider.otherwise('/');
}