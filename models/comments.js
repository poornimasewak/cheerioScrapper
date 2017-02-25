var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	user:{
		type: String
	},
	content: {
		type: String
	}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;