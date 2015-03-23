/**
 * Created by Maurice on 3/22/2015.
 */


(function (angular) {

    angular.module('myMod',[])

    //angular.module('myMod')

    var app = angular.module('mainApp', ['ngResource', 'ngRoute', 'myMod']);


    app.factory('Movie', function ($resource) {
        return $resource('/api/movies/:id',
            {id: '@id'},
            {update: {method: 'put'}});
    });

    app.config(function ($routeProvider) {
        $routeProvider.when('/movies', {
            controller: 'movieListController',
            templateUrl: 'movie-list.html'
        });

        $routeProvider.when('/movie/:id', {
            controller: 'movieEditController',
            templateUrl: 'movie-editor.html',
            resolve: {
                movie: function (Movie, $route) {
                    return Movie.get({id: $route.current.params.id});
                }
            }
        });

        $routeProvider.otherwise({
            redirectTo: '/movies'
        })
    });

    app.controller('movieListController', function ($scope, $location, Movie) {
        $scope.movies = Movie.query();

        $scope.edit = function (movie) {
            $location.path('/movie/' + movie.id);
        };
    });

    app.controller('movieEditController', function ($scope, $location, movie) {
        $scope.movie = movie;

        $scope.save = function () {
            movie.$update().then(function () {
                $location.path('/movies')
            }, function (err) {
                console.log(err);
            });
        };

        $scope.cancel = function () {
            $location.path('/movies')
        };
    });


    //app.controller('demoController', ["$scope", function (s) {
    //    s.person={
    //        firstName : 'Maurice'
    //    };
    //}])

    function demoController(s) {
        s.person={
            firstName : 'Maurice'
        };
    }
    demoController.$inject=["$scope"];
    app.controller('demoController', demoController )

})(window.angular);
