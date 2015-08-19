var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./controllers/dbclient');
var routes = require('./routes/DislikeRoutes')(express, db);

db.connect({
    success: function() {
        console.log("connected to db");
    },

    error: function(error) {
        console.log(error);

        // End....
        res.status(500);
        res.send({ code: 500, error: error });
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.listen(process.env.PORT || 3000);
