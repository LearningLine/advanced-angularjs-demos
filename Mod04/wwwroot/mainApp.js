/**
 * Created by Maurice on 3/22/2015.
 */


(function (angular) {

    var app = angular.module('mainApp', ['ngResource']);


    app.controller('demoController', function ($scope) {
        $scope.person = {
            firstName: '',
            lastName: ''
        };
    })


    app.directive('setFocus', function () {
        return  {
            restrict: 'A',
            link: function (scope, element) {
                element[0].focus();
            }
        }
    })


    app.directive('theTemplate', function () {
        return{
            transclude: true,
            //template:'<p>The template</p>'
        templateUrl: '/templates/demo.html'
        };
    })


    app.directive('inheritedScope', function () {
        return{
            scope: true,
            template:'<p>The template with scope {{$id}} with user {{person.firstName}}</p>',
            link:function(scope){
                scope.$watch('person.firstName', function(newValue, oldValue){
                    console.log(newValue    , oldValue);
                })
            }
        };
    })

    app.directive('isolatedScope', function () {
        return{
            scope: {person:'=',
            firstName:'@'},
            template:'<p>The template with scope {{$id}} with user {{person.firstName}}</p>',
            link:function(scope){
                scope.$watch('person.firstName', function(newValue, oldValue){
                    console.log('isolatedScope', newValue    , oldValue);
                })

                scope.$watch('firstName', function(newValue, oldValue){
                    console.log('firstName', newValue    , oldValue);
                })
            }
        };
    })

})(window.angular);
