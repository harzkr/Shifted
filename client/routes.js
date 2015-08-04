angular.module("shifted").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/orders");
    }
  });
}]);

angular.module("shifted").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'client/users/views/login.ng.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
        })
        .state('register',{
            url: '/register',
            templateUrl: 'client/users/views/register.ng.html',
            controller: 'RegisterCtrl',
            controllerAs: 'rc'
        })
        .state('resetpw', {
            url: '/resetpw',
            templateUrl: 'client/users/views/reset-password.ng.html',
            controller: 'ResetCtrl',
            controllerAs: 'rpc'
        })
        .state('logout', {
            url: '/logout',
            resolve: {
                "logout": ['$meteor', '$state', function($meteor, $state) {
                    return $meteor.logout().then(function(){
                        $state.go('orders');
                    }, function(err){
                        console.log('logout error - ', err);
                    });
                }]
            }
        })

      .state('orders', {
        url: '/orders',
        templateUrl: 'client/orders/views/orders-list.ng.html',
        controller: 'OrdersListCtrl'
      })
      .state('orderDetails', {
        url: '/personal/:orderId',
        templateUrl: 'client/orders/views/order-details.ng.html',
        controller: 'OrderDetailsCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      })
      .state('personalOrders',{
          url:'/personal',
          templateUrl : 'client/orders/views/personal-orders.ng.html',
          controller: 'PersonalOrdersCtrl'
      });

    $urlRouterProvider.otherwise("/orders");
  }]);
