//import
const nedb = require('nedb');
const fs = require('fs');
const express = require('express');
const bp = require('body-parser');
const mustache_express = require('mustache-express');
const app_opts = { root: process.cwd() };
const db = new nedb('./data/db2.json');
const showdown = require('showdown');
const cookieParser = require('cookie-parser');

//global var
const app = new express();
converter = new showdown.Converter();
db.loadDatabase(function(err) { if (err) { console.log("loadDatabase: error: " + err);} });

//initalisations
app.use(bp.urlencoded({ extended: false }));
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

app.route('/SkillShare').get(function (req,res) {
    res.sendFile('views/skillshare.html', app_opts);
})

app.route('/SignUp').get(function (req,res) {
    res.sendFile('views/signUp.html', app_opts);
})

app.route('/LogIn').get(function (req,res) {
    res.sendFile('views/signIn.html', app_opts);
})

app.route('/kjwdawdahjWYHuy792fglpwhgmdk').get(function (req,res) {
    res.sendFile('views/LogConf.html', app_opts);
})

app.route('/LogOut').get(function (req,res) {
    res.sendFile('views/LogOut.html', app_opts);
})

app.route('/Skills').get(function (req,res,document) {
    res.sendFile("views/skills.html", app_opts);
})

app.route('/Acc').get(function (req,res) {
    res.sendFile('views/account.html', app_opts);
})

app.route('/AccSend').post(function (req, res) {

    console.log(req.body);

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

                res.writeHead(301, {Location: 'http://localhost:8080/kjwdawdahjWYHuy792fglpwhgmdk'});
                res.end();

            } else {

                res.send("Incorrect log in");

            }

        }

    })

})

app.route('/Acc').get(function (req,res) {
    res.sendFile('views/account.html', app_opts);
})

app.route('/SkillLog').post(function (req,res) {

    console.log(key);

    console.log(req.body);

    var s1 = req.body.skill1.toLowerCase();
    /* var s2 = req.body.skill2.toLowerCase();
    var s3 = req.body.skill3.toLowerCase();
    var s4 = req.body.skill4.toLowerCase(); */

    var skills = s1;
    //skills.sort();

    console.log(skills);

    console.log(key);

    db.update({key:key}, { $set: { skills}},{},function () {

    })

    res.writeHead(301, {Location: 'http://localhost:8080/'});
    res.end();

})

app.route('/Training').get(function (req,res) {

    db.find({key: key}, function (err,data) {



        var s1 = data[0].skills;
        //var s2 = data[0].skills["s2"];
        //var s3 = data[0].skills["s3"];
        //var s4 = data[0].skills["s4"];


        if (s1 == "c+") {

            res.sendFile("views/training/c.html", app_opts);

        } else if (s1 == "java"){

            res.sendFile("views/training/j.html", app_opts);

        } else if (s1 == "javascript") {

            res.sendFile("views/training/js.html", app_opts);

        } else if (s1 == "python") {

            res.sendFile("views/training/p.html", app_opts);

        } else {

            res.send("You have incompatable skills - Please update and try again!");

        }

    })

})


app.route('/Projects').get(function (req,res) {

    db.find({key: key}, function (err,data) {



        var s1 = data[0].skills;
        //var s2 = data[0].skills["s2"];
        //var s3 = data[0].skills["s3"];
        //var s4 = data[0].skills["s4"];


        if (s1 == "c+") {

            res.sendFile("views/projects/c.html", app_opts);

        } else if (s1 == "java"){

            res.sendFile("views/projects/j.html", app_opts);

        } else if (s1 == "javascript") {

            res.sendFile("views/projects/js.html", app_opts);

        } else if (s1 == "python") {

            res.sendFile("views/projects/p.html", app_opts);

        } else {

            res.send("You have incompatable skills - Please update and try again!");

        }

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