angular.module('shifted',['angular-meteor', 'ui.router','angularUtils.directives.dirPagination','uiGmapgoogle-maps', 'ngMaterial', 'ionic']);


function onReady() {
  angular.bootstrap(document, ['shifted']);
}

if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
}
else {
  angular.element(document).ready(onReady);
}
