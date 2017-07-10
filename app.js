var express = require('express');
var app = express();
var moment = require('moment');


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res){
    res.render('query');
});

app.get('/:userdate', function(req, res){
    
    var userinput = req.params.userdate;
    var userdate = Number(userinput);
    //Checking if the user's input is a positive number. If it is, we assume it to be a unix number and convert it to a normal date.
    if (isNaN(userdate) === false && userdate >= 0){
        var unixdate = userdate;
        var date = moment(unixdate).format('MMMM DD, YYYY');
    }
    else if(isNaN(userdate) === true){
        date = moment(userinput, ['DDMMMMY', 'MMMMDDY', 'YDDMMMM', 'YMMMMDD', 'DDYMMMM', 'MMMMYDD']).format('MMMM DD, YYYY');
        if(date === 'Invalid date'){
            date = 'Null';
            unixdate = 'Null';
        }
        else{
        unixdate = Number(moment(date).format('X'));
        }
    }
    var json = 
        {
            'unix': unixdate,
            'normal': date
        };
    
    res.render('timestamp', {unixdate: json.unix, date: json.normal});
        
});

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log('Could not reach the server. ERROR: ' + err);
    }
    else{
        console.log('Listening to port: ' + process.env.PORT);
    }
});