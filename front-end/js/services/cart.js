angular
  .module('wdi_p4')
  .factory('Cart', Cart);

Cart.$inject = ['$resource', 'API_URL'];
function Cart($resource, API_URL) {
  return $resource(API_URL + '/carts/:id', { id: '@_id' }, {
    update: { method: 'PUT' }
  });
}