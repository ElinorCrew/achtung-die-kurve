var express = require('express'),  
    io = require('socket.io'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567;

var app = express();

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.use(express.static(__dirname + '/client'));

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port, hostname);
