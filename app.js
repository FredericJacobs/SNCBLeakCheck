/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , passenger = require('./routes/passenger')
 , http = require('http')
 , path = require('path')
 , mongoose = require('mongoose')
 , Schema = mongoose.Schema
 , md5 = require('MD5');;

 var app = express();

 app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('rklfsdafsweufdjakalsf'));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect('localhost', 'SNCB');
  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log("Sucessfully Connected to the Database");
  });
});

 var passenger_record_schema = new Schema({
  stCUST_ID:  Boolean,
  GENDER: Boolean,
  FIRSTNAME:   String,
  LASTNAME: String,
  BIRTHDATE: Boolean,
  LOGON_ID: Boolean,
  CONTACT_LANGUAGE: Boolean,
  STREET: Boolean,
  HOUSE_NR: Boolean,
  POSTAL_CODE: Boolean,
  CITY: Boolean,
  COUNTRY: Boolean,
  PRIVATE_FIXED_TELEPHONE: Boolean,
  PRIVATE_MOBILE_TELEPHONE: Boolean,
  BUSINESS_TELEPHONE: Boolean,
  EMAIL: String
});

mongoose.model('Passenger_record', passenger_record_schema, 'passengers');

Passenger_record = db.model('Passenger_record');

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/passenger', passenger.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
