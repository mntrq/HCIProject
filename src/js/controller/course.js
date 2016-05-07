angular.module('courseApp', ['ui.router'])
  .controller('CourseController', function ($scope, $http) {
    var courseList = this
    $http.get('src/json/list.json')
    .success(function(data, status, headers, config) {
      $scope.lists = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
  })
  .directive('collapseToggler', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
            elem.on('click', function() {
        $(this).siblings('.collapse').toggleClass('in');
          });
    }
  };
})
