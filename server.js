/**
 * Created by Gerardo on 5/9/2015.
 */
var express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

//rutas api
app.use(require('./auth'));

app.use('/api/posts',require('./controllers/api/posts'));
app.use('/api/sessions',require('./controllers/api/sessions'));
app.use('/api/users',require('./controllers/api/users'));

app.use(require('./controllers/static'));

var server = app.listen(3000, function() {
    console.log('server en port 3000')
});
require('./websockets').connect(server);