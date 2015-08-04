angular.module("shifted").controller("OrdersListCtrl", ['$scope', '$meteor','$state',
  function($scope, $meteor){

    //$scope.orders = $meteor.collection(Orders).subscribe('orders');
   $scope.page = 1;
   $scope.perPage = 3;
   $scope.sort = { name: 1 };
   $scope.orderProperty = '1';

   $scope.orders = $meteor.collection(function() {
     return Orders.find({}, {
       sort : $scope.getReactively('sort')
     });
   });

   $meteor.autorun($scope, function() {
     $meteor.subscribe('orders', {
       limit: parseInt($scope.getReactively('perPage')),
       skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
       sort: $scope.getReactively('sort')
     }, $scope.getReactively('search')).then(function() {
       $scope.ordersCount = $meteor.object(Counts ,'numberOfOrders', false);
       $scope.orders.forEach( function (order) {
          order.onClicked = function () {
            $state.go('orderDetails', {orderId: order._id});
          };
        });

        $scope.map = {
          center: {
            latitude: 45,
            longitude: -73
          },
          zoom: 8
        };
      });
     });

   $scope.remove = function(order){
     $scope.orders.splice( $scope.orders.indexOf(order), 1 );
   };

   $scope.pageChanged = function(newPage) {
     $scope.page = newPage;
   };

   $scope.$watch('orderProperty', function(){
     if ($scope.orderProperty)
       $scope.sort = {name: parseInt($scope.orderProperty)};
   });

}]);
