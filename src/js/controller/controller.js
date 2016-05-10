var app = angular.module('controllerApp', ['ui.router','angular-toArrayFilter'])
  .controller('EnrollController', function ($http, $rootScope, UserService, $state) {
    var self = this
    $rootScope.registeredArr = [];

    if($rootScope.userid.val() && $rootScope.password.val()){
      console.log("logged in");
    }
    else {
      console.log("not log in");
      $state.go('login');
    }

    $http.get('src/json/combined.json')
    .success(function(data, status, headers, config) {
      self.courses = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    console.log($rootScope.userid.val());
    console.log($rootScope.password.val());

    UserService.getArr()
      .then(function(data) {
        // promise fulfilled
        console.log(data);
        $rootScope.registeredArr = data;
      }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
      });

    self.getEachCourse = function(id){
     $http.get('src/json/' + id + '.json')
     .success(function(data, status, headers, config) {
       self.eachCourse = data;
     }).
     error(function(data, status, headers, config) {
       // log error
     });
    }
    self.isRegistered = function(id) {
      for( var i = 0; i < $rootScope.registeredArr.length; i++ ) {
        if( $rootScope.registeredArr[i].id === id ) {
          return true;
        }
      }
      return false;
    }

    self.registered = function(id){
      self.getEachCourse(id)
      if(!self.isRegistered(id)){
          $rootScope.registeredArr.push(self.eachCourse);
      }

      var body = { [$rootScope.userid.val()] : $rootScope.registeredArr };
      console.log(JSON.stringify(body));
      $http.post('http://52.37.98.127:3000/v1/5610546761?pin=1111', angular.toJson(body), {
                headers : {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {
              // alert('success1')
            }).
            error(function(data, status, headers, config) {
              alert('failed : ' + data);
            });
      }

      self.logout = function(){
        $rootScope.userid = "";
        $rootScope.password = "";
      }

  })

  .controller('WithdrawController', function ($http, $rootScope, $scope, UserService, $state) {
      var self = this
      if($rootScope.userid.val() && $rootScope.password.val()){
        console.log("logged in");
      }
      else {
        console.log("not log in");
        $state.go('login');
      }

      UserService.getArr()
        .then(function(data) {
          // promise fulfilled
          $rootScope.registeredArr = data;
          self.test = JSON.stringify(data, null, ' ');
          console.log(self.test);
        }, function(error) {
                  // promise rejected, could log the error with: console.log('error', error);
        });
      self.removeRow = function(id){
        console.log(id);
        for( var i = 0; i < $rootScope.registeredArr.length; i++ ) {
          if( $rootScope.registeredArr[i].id === id ) {
            $rootScope.registeredArr.splice(i, 1 );
            break;
          }
        }

          var body = { [$rootScope.userid.val()] : $rootScope.registeredArr};
          console.log(JSON.stringify(body));
          $http.post('http://52.37.98.127:3000/v1/5610546761?pin=1111', angular.toJson(body), {
                headers : {
                    'Content-Type': 'application/json'
                }
            }).success(function(data, status, headers, config) {
              // alert('success2')
            }).
            error(function(data, status, headers, config) {
              alert(data.body);
            });
      	}

        self.totalCredits = 0;
        UserService.getArr()
          .then(function(data) {
            // promise fulfilled
            console.log(data);
            for(var i=0 ; i<data.length ; i++){
                self.totalCredits += data[i].credit.total;
            }
          }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
          });
        self.getTotalCredit = function(){
          return self.totalCredits;
        }

        self.logout = function(){
          $rootScope.userid = "";
          $rootScope.password = "";
        }
  })

  .controller('LoginController', function ($http, $rootScope, UserService) {
      var self = this
      $rootScope.userid = angular.element($('#login'))
      $rootScope.password = angular.element($('#key'))

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


  app.factory('UserService', function($http, $q, $timeout, $rootScope) {
    var arr = [];
    return {
        getArr: function() {
          var defer = $q.defer();
          $timeout(function() {
            if ( arr.length == 0) {
              $http.get('http://52.37.98.127:3000/v1/5610546761?pin=1111')
              .then(function(response) {
                if (!response.data[$rootScope.userid.val()]) {
                  this.arr = [];
                } else {
                  this.arr = response.data[$rootScope.userid.val()];
                }
                return defer.resolve(this.arr);
              }, function(response) {
                // something went wrong
                return defer.reject(response.data);
              });
            } else {
              return defer.resolve(arr);
            }
          }, 1500);
          return defer.promise
        }
    };
  });
