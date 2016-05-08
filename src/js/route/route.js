angular.module('controllerApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/enroll");
  //
  // Now set up the states
  $stateProvider
    .state('enroll', {
      url: "/enroll",
      templateUrl: "src/view/enroll.tmpl"
    })
    .state('withdraw', {
      url: "/withdraw",
      templateUrl: "src/view/withdraw.tmpl",

    })
});
