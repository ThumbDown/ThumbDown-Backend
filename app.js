var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes')(express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.listen(process.env.PORT || 3000);
