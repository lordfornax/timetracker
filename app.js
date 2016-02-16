'use strict';

// modulok
var express = require('express'),
	pages = require('./routes/pages'),
	api = require('./routes/api'),
	path = require( 'path' ),
	http = require('http'),
	app = express();

// kornyezet
app.set('port', process.env.PORT || 8888);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static( path.join(__dirname, '.')) );
app.set('view engine', 'jade');

// csak dev modman
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routing
app.param('timestamp', function (req, res, next, timestamp) {
	if (/^[0-9]{0,13}$/.test(timestamp)) {
		req.timestamp = timestamp;
	}
	
	next();
});

app.get('*.jade', pages.fromJade);
app.get('/', pages.index);
app.get('/add', pages.additem);
app.get('/report', pages.report);
app.get('/api', api.apiindex);
app.get('/api/items', api.list);
app.get('/api/items/:timestamp', api.byinterval);
app.get('/api/items/:id', api.show);
app.post('/api/sendmail', api.sendmail);
app.post('/api/items', api.create);
app.delete('/api/items/:id', api.remove);

// szerver inditas
var port = app.get('port');

http.createServer(app).listen(port, function (){
	console.log('TimeTracker app elinditva (localhost:' + port + ')');
});
