/**
 * Created by Maurice on 3/23/2015.
 */

describe('Protractor Demo App', function () {
    it('should have a title', function () {
        browser.get('http://localhost:8080');

        expect(browser.getTitle()).toEqual('AngularJS');
    });

    it('should redirect to movies', function () {
        browser.get('http://localhost:8080');

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/#/movies');
    });

    it('should redirect to movies', function () {
        browser.get('http://localhost:8080');

        element(by.repeater('movie in movies')
            .row(1)
            .column('movie.title'))
            .click();

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/#/movie/9917');
    });


    it('should save a movie edit', function () {
        browser.get('http://localhost:8080/#/movie/9917');

        var newTitle = 'Title ' + Math.random();

        element(by.model('movie.title')).clear().sendKeys(newTitle);
        element(by.buttonText('Save')).click();


        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/#/movies');

        var listTitle = element(by.repeater('movie in movies')
            .row(1)
            .column('movie.title'))
            .getText();

            expect(listTitle).toEqual(newTitle);
    });

});