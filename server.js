var express = require('express');
var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

//use body parser to pass all the form data
app.use(bodyParser.urlencoded({ extended: true }));

//call in the dateformat module
var dateFormat = require('dateformat');
var now = new Date();

//setting up view engine
app.set('view engine', 'ejs');

//importing all related js files and css
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


//create db connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapp'
});

//global site title and base url

const siteTitle = "Simple Application";
const baseUrl = "http://localhost:3000/";


//page to load when the url is called
app.get('/',function(req, res){
        con.query("SELECT * FROM `e_events` ORDER BY start_date DESC", function(err,result){
            console.log(result);
    });
        res.render('pages/index',{
            siteTitle : siteTitle,
            pageTitle : "Event List",
            items : 'result'
    });
});
app.get('/event/add',function(req, res){
    res.render('pages/add-event',{
        siteTitle : siteTitle,
        pageTitle : "Add New Event",
        items : ''
    });
});

app.post('/event/add',function(req,res){

//get rhe records and save to db
var query= "INSERT INTO `events`(name,start_date,end_date,description,location)"
    query += "'"+req.body.name+"',";
    query += "'"+dateFormat(req.body.start_date,"yyyy-mm-dd")+"',";
    query += "'"+dateFormat(req.body.end_date, "yyyy-mm-dd")+"',";
    query += "'"+req.body.description+"',";
    query += "'"+req.body.location+"',";

    con.query(query,function(err,result){
        res.redirect(baseUrl);
    });
});


/*conn.connect(function(err){
    if (err) throw err;
    console.log('connected to the db');
});*/


//server connection****
var server = app.listen(3000,function(err, res){
    if (err) {
        console.log(err);
    }else
    console.log('server is running on: localhost:3000');
});
