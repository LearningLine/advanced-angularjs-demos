/**
 * Created by Maurice on 3/22/2015.
 */


(function(angular){

    var app = angular.module('mainApp',['ngResource']);


    app.factory('Movie', function($resource){
        return $resource('/api/movies/:id');
    });


    app.controller('moviesController', function($scope, Movie){
        $scope.movies = Movie.query();
    })

})(window.angular);
