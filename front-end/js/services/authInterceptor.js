angular.module('wdi_p4')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API_URL', 'tokenService'];
function AuthInterceptor(API_URL, tokenService){
  return{
    request: function(config){
      var token = tokenService.getToken()

      if(!!config.url.match(API_URL) && !!token){
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function(res){
      if(!!res.config.url.match(API_URL) && !!res.data.token){
        tokenService.saveToken(res.data.token);
      }
      return res;
    }
  }
}