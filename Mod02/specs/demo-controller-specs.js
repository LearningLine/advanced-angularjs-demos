/**
 * Created by Maurice on 3/23/2015.
 */


describe('The mathSvc', function () {

        beforeEach(module('mainApp'));

        it('can add 1 + 1', inject(function (mathSvc) {

            var sum = mathSvc.add(1, 1);

            expect(sum).toBe(2);
        }))
    }
)


describe('The demoController', function () {
        var ctrl, scope, httpBackend;
        beforeEach(module('mainApp'));

        beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
            httpBackend=$httpBackend;

            httpBackend.whenGET('/api/movies').respond([{},{}]);

            scope = $rootScope.$new();
            ctrl = $controller('demoController', {
                $scope: scope
            });

        }));

        it('can instanite the controller', inject(function ($controller, $rootScope) {

            var ctrl = $controller('demoController', {
                $scope: $rootScope.$new()
            });


            expect(ctrl).toBeDefined();
        }))

        it('can instanite the controller', function () {
            expect(ctrl).toBeDefined();
        })

        it('has a sum on the scope', function () {
            expect(scope.sum).toBe(3);
        })

        it('loadsMovies', function () {
            httpBackend.flush();
            expect(scope.movies.length).toBe(2);
        })
    }
)