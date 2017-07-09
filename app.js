var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('query');
});





app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log('Could not reach the server. ERROR: ' + err);
    }
    else{
        console.log('Listening to port: ' + process.env.PORT);
    }
});