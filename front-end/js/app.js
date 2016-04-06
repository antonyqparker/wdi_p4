angular
  .module('wdi_p4', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API_URL', 'http://localhost:3000/api')
  .config(Router)
  .config(InterceptorConfig);

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
      templateUrl: 'partials/register.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html'
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
      templateUrl: 'partials/cart.html'
    })
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'partials/checkout.html'
    })


  $urlRouterProvider.otherwise('/');
}