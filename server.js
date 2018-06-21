var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var routes = require('./controllers/burgers_controller.js');
const favicon = require('express-favicon');
var PORT = process.env.PORT || 8080;
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory
app.use('/public', express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(routes);
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/assets/img/favicon.png'));

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});