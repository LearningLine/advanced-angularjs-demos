/**
 * Created by Maurice on 3/22/2015.
 */


(function (angular) {

    var app = angular.module('mainApp', ['ngResource', 'ngRoute']);


    app.factory('Movie', function ($resource) {
        return $resource('/api/movies/:id',
            {id: '@id'},
            {update: {method: 'put'}});
    });

    app.config(function ($routeProvider) {
        $routeProvider.when('/movies', {
            controller: 'movieListController',
            templateUrl: 'movie-list.html',
            resolve: {
                movies: function (Movie) {
                    return Movie.query();
                }
            }
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

    app.controller('movieListController', function ($scope, $location, movies) {
        $scope.movies = movies;

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

    app.service('mathSvc', function () {
        this.add = function (x, y) {
            return x + y;
        }
    });

    app.controller('demoController', function ($scope, mathSvc, Movie) {
        $scope.movies = Movie.query();

        $scope.sum = mathSvc.add(1, 2);

        $scope.$watch('sum', function (newValue, oldValue) {
            console.log(newValue, oldValue)

        })
    })


})(window.angular);
