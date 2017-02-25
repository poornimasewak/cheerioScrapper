//initialize express app
var express = require('express');
var app = express();

//for scraping
var request = require("request");
var cheerio = require("cheerio");
var url = "http://www.foxnews.com/leisure/index.html";

//some other dependencies
var bodyParser = require('body-parser');

function shouldWipe() {
    return process.argv[2] === "--wipe";

}

// mongoose
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var Cat = mongoose.model('Cat', {
//     name: String
// });

// var kitty = new Cat({
//     name: 'Zildjian'
// });
// kitty.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('meow');
//     }
// });

// app.use(logger('dev'));
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

app.get("/", function (req, res) {
res.render("index");
});

app.get("/scrapeData", function (req, res) {
    request(url, function (error, response, html) {

        var $ = cheerio.load(html);

        var result = [];

        // $("div.summary").each(function (i, element) {
// $(".c-latest .dv-item.article-ct .cat-name").each(function (i, element) {
    $(".dv-feature .dv-encap .dv-item").each(function (i, element) {
            // console.log(element);
            var category = $(this).children(' .cat-name').text().trim();
            var title = $(element).children('h3').text().trim();
            var link = $(element).children('h3').children('a').attr('href');
            // console.log("category : " + category + "/ntitle = " + title + "/nlink : " + link);

            result.push({
                category: category,
                title: title,
                link: link
            });

        });

        console.log(result);
        res.render("index");

    });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Listening at Port " + PORT);
});