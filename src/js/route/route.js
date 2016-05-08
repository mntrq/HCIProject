angular.module('courseApp')
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
    .state('changepage', {
      url: "/changepage",
      templateUrl: "src/view/changepage.tmpl"
    })
});
