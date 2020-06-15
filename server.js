//import
const nedb = require('nedb');
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
app.engine('html', mustache_express());
app.use(bp.urlencoded({ extended: false }));
app.set('view engine', 'html');
app.use(cookieParser());

//Get routes

app.route('/').get(function (req,res) {
    res.sendFile('views/home.html', app_opts);
})

app.route('/SignUp').get(function (req,res) {
    res.sendFile('views/signUp.html', app_opts);
})

app.route('/LogIn').get(function (req,res) {
    res.sendFile('views/signIn.html', app_opts);
})

app.route('/LogOut').get(function (req,res) {
    res.sendFile('views/LogOut.html', app_opts);
})

app.route('/Skills').get(function (req,res,document) {
    res.sendFile("views/skills.html", app_opts);
})


app.route('/Log').get(function (req,res) {
    res.sendFile('views/signIn.html', app_opts);
})

app.route('/Java1').get(function (req,res) {
    res.sendFile('views/training/j1.html', app_opts);
})

app.route('/Java2').get(function (req,res) {
    res.sendFile('views/training/j2.html', app_opts);
})

app.route('/Java3').get(function (req,res) {
    res.sendFile('views/training/j3.html', app_opts);
})

app.route('/Js1').get(function (req,res) {
    res.sendFile('views/training/js1.html', app_opts);
})

app.route('/Js2').get(function (req,res) {
    res.sendFile('views/training/js2.html', app_opts);
})

app.route('/Js3').get(function (req,res) {
    res.sendFile('views/training/js3.html', app_opts);
})

app.route('/c1').get(function (req,res) {
    res.sendFile('views/training/c1.html', app_opts);
})

app.route('/c2').get(function (req,res) {
    res.sendFile('views/training/c2.html', app_opts);
})

app.route('/c3').get(function (req,res) {
    res.sendFile('views/training/c3.html', app_opts);
})

app.route('/p1').get(function (req,res) {
    res.sendFile('views/training/p1.html', app_opts);
})

app.route('/p2').get(function (req,res) {
    res.sendFile('views/training/p2.html', app_opts);
})

app.route('/p3').get(function (req,res) {
    res.sendFile('views/training/p3.html', app_opts);
})

app.route('/ContactUs').get(function (req,res) {
    res.sendFile("views/contactUs.html", app_opts);
})
app.route('/ContactUs').post(function (req,res) {
    res.writeHead(301, {Location: 'http://localhost:8080/'});
    res.end();
})

//Post routes
app.route('/AccSend').post(function (req, res) {

    console.log(req.body);

    var yes = true;
    var key = req.body.email + req.body.password;
    var email = req.body.email;

    var record = {key: key, email: email};

    console.log(record);

    db.find({}, function (err, doc) {

        var emailInUse = false;

        console.log(doc.length + "length before for loop!");
        if(doc.length === 0){

            db.insert(record);
            res.writeHead(301, {Location: 'http://localhost:8080/'});
            res.end();
            return;
        }

        for (var i = 0; i < doc.length; i++){

            console.log(doc.length);

            if(email === doc[i].email) {

                console.log(doc.length + " DOC LENGTH");
                console.log("Else IF: " + doc[i].email);
                emailInUse = true;

                res.send("Error, email already in use!");
                return;
            }
        }

        if (emailInUse === false){

            db.insert(record);
            res.writeHead(301, {Location: 'http://localhost:8080/'});
            res.end();

        }

    })

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

                res.set().cookie("Logged", "True");

                res.writeHead(301, {Location: 'http://localhost:8080/'});
                res.end();

            } else {

                res.send("Incorrect log in");

            }

        }

    })

})

app.route('/SkillLog').post(function (req,res) {


    console.log(req.body);
    var cook = req.headers.cookie;

    if (cook == "Idea-75d1fab4=54962c49-07ba-44f6-a049-683b5dfddb35; Logged=True") {

        var s1 = req.body.skill1.toLowerCase();

        var skills = s1;

        console.log(skills);

        try {db.update({key: key}, {$set: {skills}}, {}, function () {

        }) } catch {

            res.send("Please log out and back in!");

        }

        res.writeHead(301, {Location: 'http://localhost:8080/'});
        res.end();
    }

})

app.route('/Training2').get(function (req,res) {

    console.log(req.headers.cookie);
    var cook = req.headers.cookie;

    if (cook == "Idea-75d1fab4=54962c49-07ba-44f6-a049-683b5dfddb35; Logged=True") {

        try{ db.find({key: key}, function (err,data) {

            var s1 = data[0].skills;

            if (s1 == "c++" || s1 == "c plus") {

                res.sendFile("views/training/c.html", app_opts);

            } else if (s1 == "java"){

                res.sendFile("views/training/j.html", app_opts);

            } else if (s1 == "javascript" || s1 == "js") {

                res.sendFile("views/training/js.html", app_opts);

            } else if (s1 == "python") {

                res.sendFile("views/training/p.html", app_opts);

            } else {

                res.send("You have no skill selected, or you have an incompatable skill - Please update and try again!");

            }

        }) } catch {

            res.send("Please log out and back in!");

        }


    } else {

        res.sendFile("views/signIn.html", app_opts)

    }

})


app.route('/Projects2').get(function (req,res) {

    var cook2 = req.headers.cookie;

    if (cook2 == "Idea-75d1fab4=54962c49-07ba-44f6-a049-683b5dfddb35; Logged=True") {

        try {db.find({key: key}, function (err,data) {

            var s1 = data[0].skills;

            if (s1 == "c++" || s1 == "c plus") {

                res.sendFile("views/projects/c.html", app_opts);

            } else if (s1 == "java"){

                res.sendFile("views/projects/j.html", app_opts);

            } else if (s1 == "javascript" || s1 == "js") {

                res.sendFile("views/projects/js.html", app_opts);

            } else if (s1 == "python") {

                res.sendFile("views/projects/p.html", app_opts);

            } else {

                res.send("You have incompatable skills - Please update and try again!");

            }

        }) } catch {

            res.send("Please log out and back in!");

        }

    } else {

        res.sendFile("views/signIn.html", app_opts);

    }

})

app.route('/Acc').get(function (req,res) {

    db.find({key: key}, function (err, doc) {

        var j1 = doc[0].compSkillj1;
        var j2 = doc[0].compSkillj2;
        var j3 = doc[0].compSkillj3;
        var c1 = doc[0].compSkillc1;
        var c2 = doc[0].compSkillc2;
        var c3 = doc[0].compSkillc3;
        var js1 = doc[0].compSkilljs1;
        var js2 = doc[0].compSkilljs2;
        var js3 = doc[0].compSkilljs3;
        var p1 = doc[0].compSkillp1;
        var p2 = doc[0].compSkillp2;
        var p3 = doc[0].compSkillp3;

        var data = {j1: j1, j2:j2, j3: j3, c1: c1, c2: c2, c3: c3, p1: p1, p2: p2, p3: p3, js1: js1, js2: js2, js3: js3};

        res.render("test", data);

    })
})

app.route('/SkillSaveJ1').post(function (req,res) {


    console.log(req.body);
    var compSkillj1 = req.body.java1;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillj1}},{},function () {

        })

    })

})

app.route('/SkillSaveJ2').post(function (req,res) {


    console.log(req.body);
    var compSkillj2 = req.body.java2;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillj2}},{},function () {

        })

    })

})

app.route('/SkillSaveJ3').post(function (req,res) {


    console.log(req.body);
    var compSkillj3 = req.body.java3;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillj3}},{},function () {

        })

    })

})

app.route('/SkillSaveC1').post(function (req,res) {


    console.log(req.body);
    var compSkillc1 = req.body.cplus1;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillc1}},{},function () {

        })

    })

})

app.route('/SkillSaveC2').post(function (req,res) {


    console.log(req.body);
    var compSkillc2 = req.body.cplus2;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillc2}},{},function () {

        })

    })

})

app.route('/SkillSaveC3').post(function (req,res) {


    console.log(req.body);
    var compSkillc3 = req.body.cplus3;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillc3}},{},function () {

        })

    })

})

app.route('/SkillSaveP1').post(function (req,res) {


    console.log(req.body);
    var compSkillp1 = req.body.p1;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillp1}},{},function () {

        })

    })

})

app.route('/SkillSaveP2').post(function (req,res) {


    console.log(req.body);
    var compSkillp2 = req.body.p2;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillp2}},{},function () {

        })

    })

})

app.route('/SkillSaveP3').post(function (req,res) {


    console.log(req.body);
    var compSkillp3 = req.body.p3;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkillp3}},{},function () {

        })

    })

})

app.route('/SkillSaveJS1').post(function (req,res) {


    console.log(req.body);
    var compSkilljs1 = req.body.js1;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkilljs1}},{},function () {

        })

    })

})

app.route('/SkillSaveJS2').post(function (req,res) {


    console.log(req.body);
    var compSkilljs2 = req.body.js2;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkilljs2}},{},function () {

        })

    })

})

app.route('/SkillSaveJS3').post(function (req,res) {


    console.log(req.body);
    var compSkilljs3 = req.body.js3;


    db.find({key: key}, function (err, doc) {

        db.update({key:key}, { $set: { compSkilljs3}},{},function () {


        })

    })

})


//Setting server
app.use(express.static('public'));       // serve static files from 'public' directory.
var server = app.listen(8080, function () { });