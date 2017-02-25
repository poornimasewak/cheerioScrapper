//initialize express app
var express = require('express');
var app = express();

//for scraping
var request = require("request");
var cheerio = require("cheerio");
var url = "http://www.foxnews.com/leisure/index.html";

//some other dependencies
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// function shouldWipe() {
//     return process.argv[2] === "--wipe";

// }

// middleware to use morgan and bodyparser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

//public static dir
app.use(express.static(process.cwd() + '/public'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// connect to db via mongoose
mongoose.connect('mongodb://localhost/news');
var db = mongoose.Connection;

//show any errors
// db.on('error', function(err){
// 	console.log('Mongoose Error: ' + err);
// });

//show inevitable success
// db.once('open', function(){
// 	console.log('Mongoose connection a success!');
// });

//the models
var News = require('./models/news.js');
var Comment = require('./models/comments.js');

// Home page
app.get("/", function (req, res) {
       res.render("index");
});

app.get("/scrapeNews", function (req, res) {
    request(url, function (error, response, html) {

        var $ = cheerio.load(html);

        var result = [];

            $(".dv-feature .dv-encap .dv-item").each(function (i, element) {
            
            var category = $(this).children(' .cat-name').text().trim();
            var title = $(element).children('h3').text().trim();
            var link = $(element).children('h3').children('a').attr('href');
            
            result.push({
                category: category,
                title: title,
                link: link
            });
console.log(result);
            

        });
   
News.collection.insertMany(result, function(err, docs) {
        // cb(err, docs);
        
        res.json("yeah success");
});
        // var newsEntry = new News(result);
        //        console.log(newsEntry);
		// 			newsEntry.save(function(err,doc){
		// 				if(err){
		// 					console.log(err);
		// 				}
		// 				else{
		// 					console.log(doc);
		// 				}

		// 			});

    });
});

// To store scrape news in db
app.get('/News', function(req,res){
	News.find({}, function(err, doc){
				// log any errors
				if (err){
					console.log(err);
				} 
				// or send the doc to the browser as a json object
				else {
					res.json(doc);
				}
			});
	});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening at Port " + PORT);
});