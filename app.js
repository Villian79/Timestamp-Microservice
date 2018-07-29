const express   = require('express');
const app       = express();
const moment    = require('moment');
moment().format();


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.get('/api/timestamp/', (req, res) => {
  let date = new Date();
  let unixdate = Number(moment(date).format('X'));
  res.json({"unix": date.getTime(), "date": date.toUTCString()});
});

app.get('/api/timestamp/:date_string', function(req, res){
    
    let userinput = req.params.date_string;
    let unix, date;
    //let userdate = Number(userinput);
    
    if(Date.parse(userinput)){
      date = new Date(userinput);
      res.json({"unix": Date.parse(date), "date": date.toUTCString()});
    }
     else{
       unix = +userinput;
       if(moment(unix).isValid()){
         let day = moment(unix).format();
        date = new Date(day);
        res.json({"unix": unix, "date": date.toUTCString()});
       }
       else{
         res.json({"error" : "Invalid Date" });
       }
     }
       
});

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log('Could not reach the server. ERROR: ' + err);
    }
    else{
        console.log('Listening to port: ' + process.env.PORT);
    }
});