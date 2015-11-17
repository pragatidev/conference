/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), 
	user = require('./routes/user'), speakers = require('./routes/speakers'), 
	http = require('http'), path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/speakers', speakers);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/ connect to our database
// you can use your own MongoDB installation at: mongodb://127.0.0.1/
// databasename
mongoose.connect('mongodb://username:password@kahana.mongohq.
com:10073/node-api');

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
