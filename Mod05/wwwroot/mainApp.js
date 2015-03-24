/**
 * Created by Maurice on 3/22/2015.
 */


(function (angular) {

    var app = angular.module('mainApp', ['ngResource', 'toastr']);

    app.factory('Movie', function ($resource) {
        return $resource('/api/movies/:id');
    });


    app.config(function(toastrProvider, $provide){
        $provide.decorator('toastr', function($delegate){
            return {
                warning: function (msg) {
                    console.log(msg)
                    $delegate.warning(msg);
                }
            }
        })

        toastrProvider.setOption({"positionClass": "toast-bottom-full-width"});

    })

    app.controller('moviesController', function ($scope, Movie, toastr) {
        $scope.movies = Movie.query();

        $scope.showToast = function () {

            //toastr.options = {
            //    "positionClass": "toast-bottom-full-width"
            //};

            toastr.warning('A warning message')
        }
    })

})(window.angular);
