var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// app.use(express.static(__dirname + '/'));
// app.use("demo", express.static(__dirname + '/demo' ));
// app.use("/demo", express.static(__dirname + '/demo'));
// app.use(express.static(path.join(__dirname, '/')));
// app.use(express.static(__dirname));

// app.use(express.static(__dirname + '/public'));

// app.use("/", express.static(__dirname + '/'));
app.use("/", express.static(__dirname + '/demo'));
app.use("/", express.static(__dirname + '/'));

// var connection = require('./connection');
var routes = require('./routes');

var server = app.listen(process.env.PORT || 5000, function() {
   // connection.init();
   routes.configure(app);
   console.log('Server listening on port ' + server.address().port);
});
