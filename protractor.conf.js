/**
 * Created by Gerardo on 5/24/2015.
 */
exports.config = {
    framework: 'mocha',
    specs : [
        'test/e2e/*.spec.js'
    ],
    mochaOpts : {
        enableTimeouts: false
    },
    onPrepare : function() {
        process.env.PORT = 3001;
        require('./server');
    }
};