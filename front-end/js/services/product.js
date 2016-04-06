angular
  .module('wdi_p4')
  .factory('Product', Product);

Product.$inject = ['$resource', 'API_URL'];
function Product($resource, API_URL) {
  return $resource(API_URL + '/products/:id', {id: '@_id'}, {
    update: { method: 'PUT' }
  });
}

