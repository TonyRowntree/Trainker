//import
const nedb = require('nedb');
const fs = require('fs');
const express = require('express');
const mustache = require('mustache');
const csv_parse = require('csv-parse'); // for parsing a string as CSV.
const csv_out = require('csv-stringify'); // to output CSV.
const bp = require('body-parser'); // body-parser has been unbundled from express.
const mustache_express = require('mustache-express');
//const push = require('push');
const app_opts = { root: process.cwd() };
const db = new nedb('./data/db2.json');
const json2csv = require('json2csv').parse;
const showdown = require('showdown');
const cookieParser = require('cookie-parser');

//global var
const app = new express();
converter = new showdown.Converter();
db.loadDatabase(function(err) { if (err) { console.log("loadDatabase: error: " + err);} });

//initalisations
app.engine('html', mustache_express()); // This tells express to use mustache for rendering.
app.use(bp.urlencoded({ extended: false })); // we are just using basic forms.
app.set('view engine', 'html');
app.use(cookieParser());

//routes of servers

app.route('').get(function (req, res) {
    res.sendFile('views/home.html', app_opts);    
});

app.route('/ContactUs').get(function (req,res) {
    res.sendFile('views/contactus.html', app_opts);
})

app.route('/CVCreate').get(function (req,res) {
    res.sendFile('views/cvcreate.html', app_opts);
})

app.route('/CVUpload').get(function (req,res) {
    res.sendFile('views/cvupload.html', app_opts);
})

app.route('/PrivacyPolicy').get(function (req,res) {
    res.sendFile('views/privacy.html', app_opts);
})

app.route('/Q&A').get(function (req,res) {
    res.sendFile('views/qa.html', app_opts);
})

app.route('/Recommendations').get(function (req,res) {
    res.sendFile('views/recommendations.html', app_opts);
})

app.route('/SkillShare').get(function (req,res) {
    res.sendFile('views/skillshare.html', app_opts);
})

app.route('/SignUp').get(function (req,res) {
    res.sendFile('views/Acc1.html', app_opts);
})

app.route('/LogIn').get(function (req,res) {
    res.sendFile('views/signIn.html', app_opts);
})

app.route('/LogConf').get(function (req,res) {
    res.sendFile('views/LogConf.html', app_opts);
})

app.route('/Skills').get(function (req,res,document) {

    //if (document.cookie == "Logged=True") {
        res.sendFile("views/skills.html", app_opts);
       // res.writeHead(301, {Location: 'http://localhost:8080/Skills'});
       // res.end();

    //} else {

       // res.writeHead(301, {Location: 'http://localhost:8080/Log'});
       //res.end();

    //}

})

app.route('/Acc').get(function (req,res) {

    res.sendFile('views/account.html', app_opts);

})

app.route('/AccSend').post(function (req, res) {

    console.log(req.body);

    /* var credentials = req.body;

    var cred = JSON.stringify(credentials);

    fs.appendFile('./data/db2.json', cred, done);

    function done(err){

        console.log('Data successfully logged');

        res.writeHead(301, {Location: 'http://localhost:8080/'});
        res.end();

    } */

    var key = req.body.email + req.body.password;

    var record = {key: key};

    console.log(record);

    db.insert(record);


    res.writeHead(301, {Location: 'http://localhost:8080/'});
    res.end();

})

app.route('/Log').get(function (req,res) {
    res.sendFile('views/signIn.html', app_opts);
})

 app.route('/AccAuth').post(function (req,res) {

    console.log(req.body);

    global.key = req.body.email + req.body.password;

    console.log(key);

    db.find({key: key}, function (err, document) {

        if (err){

            res.send("Error");

        } else {
            if (document.length>0) {

                console.log("correct email/password");

                res.writeHead(301, {Location: 'http://localhost:8080/LogConf'});
                res.end();





            } else {

                res.send("Incorrect log in");

            }




        }

    })

    /* var email = req.body.email;
    var password = req.body.password;

    db.find({email: email}, function (err,doc) {

        if (err) {res.send('incorrect email')}
            else {
                if (db.find({password: password})) {

                    res.send('logged in');
                    console.log("success!");

                }

        }

    })*/

     /* var data = fs.readFileSync('./data/db2.json');
 var db = JSON.parse(data);

 var gEmail = db.email;
 var gPassword = db.password;
 var lEmail = req.body.email;
 var lPassword = req.body.password;

 console.log(gEmail);
 console.log(gPassword);
 console.log(lEmail);
 console.log(lPassword);

 if (lEmail == gEmail && lPassword == gPassword){

     console.log("correct email/password");
     res.writeHead(301, {Location: 'http://localhost:8080/Account'});
     res.end();

 } else {

     console.log("Incorrect");

 } */

})

app.route('/Acc').get(function (req,res) {
    res.sendFile('views/account.html', app_opts);
})

app.route('/SkillLog').post(function (req,res) {

    console.log(key);

    console.log(req.body);

    var s1 = req.body.skill1;
    var s2 = req.body.skill2;
    var s3 = req.body.skill3;
    var s4 = req.body.skill4;

    console.log(key);

    db.update({key:key}, { $set: { "skills.s1": s1, "skills.s2":s2, "skills.s3":s3, "skills.s4":s4 }},{},function () {

    })

})


//REMOVE BEFORE FINAL UPLOAD
app.route('/delete').get(function (req,res) {

    db.remove({}, {multi: true}, function (err,numRemoved) {
    })

})


//Setting server
app.use(express.static('public'));       // serve static files from 'public' directory.
var server = app.listen(8080, function () { });