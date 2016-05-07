angular.module('courseApp', ['ui.router'])
  .controller('CourseController', function ($http) {
    var self = this
    $http.get('src/json/list.json')
    .success(function(data, status, headers, config) {
      self.lists = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

    self.getEachCourse = function(id){
      $http.get('src/json/' + id + '.json')
      .success(function(data, status, headers, config) {
        self.course = data;
      }).
      error(function(data, status, headers, config) {
        // log error
      });
      return self.course;
    }

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
