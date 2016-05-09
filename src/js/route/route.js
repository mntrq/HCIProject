angular.module('controllerApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
    .state('enroll', {
      url: "/enroll",
      templateUrl: "src/view/enroll.tmpl"
    })
    .state('withdraw', {
      url: "/withdraw",
      templateUrl: "src/view/withdraw.tmpl"
    })
    .state('report', {
      url: "/report",
      templateUrl: "src/view/report.tmpl"
    })
});
