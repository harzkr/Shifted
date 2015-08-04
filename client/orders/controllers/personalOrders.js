angular.module("shifted").controller("PersonalOrdersCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.order = $meteor.object(Orders, $stateParams.orderId);

    var subscriptionHandle;
    $meteor.subscribe('orders').then(function(handle) {
      subscriptionHandle = handle;
    });

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });
}
]);
