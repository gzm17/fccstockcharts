var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./app-server/routes/routes"); //direct file to routes dir
var app = express();
var socket = require("socket.io");
var ctrlViews = require("./app-server/controllers/view-ctrl.js")

var url = process.env.MONGOLAB_URI;
//console.log("URL: ", url);

//mongoose.connect("mongodb://localhost:27017/test"); //use the test db in localhost


mongoose.connect(url, {
    useMongoClient: true
 }); //use the mLab free tier db
 
/*
WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
    at handleUseMongoClient (/Users/Z/coding/letsvote/node_modules/mongoose/lib/connection.js:440:17)
    at NativeConnection.Connection.openUri (/Users/Z/coding/letsvote/node_modules/mongoose/lib/connection.js:327:7)
*/
/*
But without using useMongoClient: true, it does not work. March 30 2017
*/


app.set("port", process.env.PORT || 3000); 
app.set("views", path.join(__dirname, 'app-server', 'views'));
app.set("view engine", "ejs");

//the following sets up to use four middlewares
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

var server = app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});

// Socket setup & pass server
//console.log("Server=", server);

var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection-1', socket.id);
    ctrlViews.handleTicker(io,socket); //Tried this from my own thoughts, looks like it works: passing io to function as well
});

