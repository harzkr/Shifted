angular.module("shifted").controller("OrderDetailsCtrl", ['$scope', '$stateParams', '$meteor',
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
    
    $scope.map = {
      center: {
        latitude: 28.6139,
        longitude: 77.2090
      },
      zoom: 8,
      events: {
        click: function (mapModel, eventName, originalEventArgs) {
          if (!$scope.order)
            return;

          if (!$scope.order.location)
            $scope.order.location = {};

          $scope.order.location.latitude = originalEventArgs[0].latLng.lat();
          $scope.order.location.longitude = originalEventArgs[0].latLng.lng();
          //scope apply required because this event handler is outside of the angular domain
          $scope.$apply();
        }
      },
      marker: {
        options: { draggable: true },
        events: {
          dragend: function (marker, eventName, args) {
            if (!$scope.order.location)
              $scope.order.location = {};

            $scope.order.location.latitude = marker.getPosition().lat();
            $scope.order.location.longitude = marker.getPosition().lng();
          }
        }
      }
    };

}]);
