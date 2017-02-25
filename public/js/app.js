$(document).on('click', "#scrapeData", function () {
    console.log("hi");
    
	$.ajax({
		url: '/scrapeData'
	}).done(function(){
		$.getJSON('/scrapeArticle', function(data){
			// var count = 1;
			// for (var i =0; i <data.length; i++){
			// 	$("#articles").append(
			// 		"<div class='individArticle' data-id=" + data[i]._id + "><img src='" + "'><h3>" + count + '. ' + data[i].title  +
			// 		"</h3><p>" + data[i].author + "</p>" +
		    //     		"<p><a href='" + data[i].link + "' class='btn btn-primary' role='button'>Link</a> <a href='/articles/" + data[i]._id +"' class='btn btn-default' role='button' id='commentButton'>Comment</a></p>" +
		    //   				"</div>")
			// 	count++;
			// }
            $("#scrapeArticle").append("hello");
            console.log(data);
		});
	});
});