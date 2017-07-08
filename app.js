var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Testing the home page');
});



app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log('Could not reach the server. ERROR: ' + err);
    }
    else{
        console.log('Listening to port: ' + process.env.PORT);
    }
});