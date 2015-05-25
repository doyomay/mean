/**
 * Created by Gerardo on 5/24/2015.
 */
var db = require('../../db');
describe('making a post', function() {
    it('logs in and create a new post', function() {
        //go to home
        browser.get('http://localhost:3001');
        //click 'login'
        element(by.css('nav .login')).click();
        //fill out and submit login form
        element(by.model('username')).sendKeys('gerardomay');
        element(by.model('password')).sendKeys('ppsspp');
        element(by.css('form .btn')).click();
        //the user should now see their post as the first post on the page
        element(by.css('nav .posts')).click();
        var post = 'my new post 2';
        element(by.model('postBody')).sendKeys(post);
        element(by.css('form .btn')).click();

    });
    it('creates an account and a new post', function() {
        //
    });
    afterEach(function() {
        db.connection.db.dropDatabase();
    });
});