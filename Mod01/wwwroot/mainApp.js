/**
 * Created by Maurice on 3/22/2015.
 */


(function (angular) {

    var app = angular.module('mainApp', ['ngResource', 'ngCookies']);


    app.factory('Movie', function ($resource) {
        return $resource('/api/movies/:id');
    });


    function getStuff() {
        return {
            x: 1
        }
    }

    app.controller('demoController',
        function ($scope, $rootScope, $cookies, $q, $timeout) {
        //$scope.$parent.message = 'Hi'
        $scope.$root.message = 'Hi';

        $cookies.counter = (+($cookies.counter || 0)) + 1;
        $scope.counter = $cookies.counter;

        //$scope.$apply(function(){
        //
        //})

        $scope.raiseEvent = function () {
            $rootScope.$broadcast('demo:event1', {msg: "The event"})
        }

            function worker(){
                var defer = $q.defer()

                $timeout( function(){
                    defer.resolve('The promisse is resolved')

                }, 1000)
                return defer.promise;
            }
            $scope.asyncFn = function () {

                var promisse = worker();

                promisse.then(function success(data){
                    alert(data)
                }, function error(err){
                    console.log(err);
                });

            }

    })

    app.controller('moviesController', function ($scope, Movie) {
        //$scope.ctrl = this;

        //$scope.$watch("message", function(){
        //    $scope.message = new Date();
        //
        //});
        $scope.$root.$on('demo:event1', function (e, args) {
            $scope.message = args.msg;
        });
        this.movies = Movie.query();

    })

})(window.angular);
