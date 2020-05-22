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
const db = new nedb('./data/db.json');
const json2csv = require('json2csv').parse;
const showdown = require('showdown');

//global var
const app = new express();
converter = new showdown.Converter();
db.loadDatabase(function(err) { if (err) { console.log("loadDatabase: error: " + err);} });

//initalisations
app.engine('html', mustache_express()); // This tells express to use mustache for rendering.
app.use(bp.urlencoded({ extended: false })); // we are just using basic forms.
app.set('view engine', 'html');

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

app.route('/Account').get(function (req,res) {
    res.sendFile('views/account.html', app_opts);
})

/* app.route('/capture').get(function (req, res) {
    
    const input = fs.readFileSync("data/formspec.csv");

    csv_parse(input, { comment: '#', cast: true, trim: true, columns: true }, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            res.render("rubric", { rubric: data });
        }
    });
}); 

app.route('/captureret').post(function (req, res) {
    console.log(req.body);
    var comp = [];
    var score = req.body.score;
    
    for(i=0; i < score.length; i++){
        comp.push({ name: req.body.name[i], score: req.body.score[i], feedback: converter.makeHtml(req.body.feedback[i]), year: req.body.year, module: req.body.module, term: req.body.term});
    };

    var record = {key: req.body.key, component:comp};
    
    res.sendFile('views/returnhome.html', app_opts);
    
    console.log(record);
    
    db.insert(record);
    
}); 


app.route('/retrieve').get(function (req, res) {
    res.sendFile("./views/keyretrieve.html", app_opts);
}); 

app.route('/retrievekey').post(function(req,res){
    key = req.body.key
    db.find({key: key}, function (err, doc) {
    if (err) {res.send('Key incorrect');} 
        else {
			if (doc.length>0) {
                res.render("results", { results: doc[0].component });
    		}
			else {
				res.send("You entered an invalid key or there is nothing in the DB")
			}
		}
		
   });
    
});

//DownloadCSV

app.route('/downloadget').get(function (req, res) {
    res.sendFile("./views/downloadretrieve.html", app_opts);
}); 

app.route('/downloadpost').post(function(req,res){
    key = req.body.key
    db.find({key: key}, function (err, doc) {
    if (err) {res.send('Key incorrect');} 
        else {
			if (doc.length>0) {
                const csvString = json2csv(doc[0].component);
                res.setHeader('Content-disposition', 'attachment; filename=grades.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csvString);
    		}
			else {
				res.send("You entered an invalid key or there is nothing in the DB")
			}
		}
		
   });
    
}); */

//Setting server
app.use(express.static('public'));       // serve static files from 'public' directory.
var server = app.listen(8080, function () { });