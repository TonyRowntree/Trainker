var wc = require('webclient');
var rq = require('request');

//these are the test scripts for GET functions
wc.get({url: 'http://localhost:8080'}).then(function(result) {
    var response = result[0];
    var body = result[1];
    if (body.match("Homepage")) {
       console.log("homepage test - Success");
    } else {
        console.log("homepage test - Fail");
    }
    }).catch(function(err){
        console.log(err.stack);
    });

wc.get({url: 'http://localhost:8080/capture'}).then(function(result) {
    var response = result[0];
    var body = result[1];
    if (body.match("Group Mark Form<")) {
       console.log("capture test - Success");
    } else {
        console.log("Capture test - Fail");
    }
    }).catch(function(err){
        console.log(err.stack);
    });

wc.get({url: 'http://localhost:8080/retrieve'}).then(function(result) {
    var response = result[0];
    var body = result[1];
    if (body.match("Key Retrieve")) {
       console.log("retrieve test - Success");
    } else {
        console.log("retrieve test - Fail");
    }
    }).catch(function(err){
        console.log(err.stack);
    });


//these are for the post requests
/*rq.post({url: 'http://localhost:8080/captureret', form: {key: "Jon", score: "10", feedback: "YES", name: "Jon"}}, function(err, response, body) {
	if (body.match("Homepage")) {
		console.log("captureretpost");
    //console.log("POST response: " + response);
    //console.log("POST body: " + body);
	} else {
		console.log("No, captureret post request isn't working");
	}
    });

rq.post({url: 'http://localhost:8080/retrievekey', form: {key: "Jon", component: "A.YES.10"}}, function(err, response, body) {
	if (body.match("A.YES.10")) {
    //console.log("POST response: " + response);
    //console.log("POST body: " + body);
	} else {
		console.log("No, retrievekey post request isn't working");
	}
    });*/

rq.post({url: 'http://localhost:8080/captureret', form: {name: "A", score:"2", feedback:"jgvhgg", key:"john"}}, function(err, response, body){
    if (body.match("Home")){
        console.log("captureret test - Success");
    } else {
        console.log("Captureret test - Fail");
    }
})

rq.post({url: 'http://localhost:8080/retrievekey', form: {key:"john"}}, function(err, response, body){
    if (body.match("Results")){
        console.log("Retrievekey test - Success");
    } else {
        console.log("Retrievekey test - Fail");
    }
})

/*rq.post({url: 'http://localhost:8080/markdownformkeyr', form: {name: "hello"}}, function(err, response, body) {
    if (body.match("hello")){
        console.log("yup");
    } else {
        console.log("nope");
    }
    });*/
