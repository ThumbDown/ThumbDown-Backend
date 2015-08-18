var express = require('express');
var app = express();
var routes = require('./routes')(express);

app.use(require('body-parser').json());
app.use(routes);
app.listen(3000);
