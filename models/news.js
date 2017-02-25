var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comments = require("./comments.js");

var NewsSchema = new Schema({
	title:{
		type:String
	},
	link:{
		type:String
	},
	category:{
		type: String
	},
	comments:[{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

var News = mongoose.model('News', NewsSchema);

module.exports = News;