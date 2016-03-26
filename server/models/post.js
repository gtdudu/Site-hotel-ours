var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	images: {
		type: String, 
	}
});

module.exports = mongoose.model('Post', PostSchema);
