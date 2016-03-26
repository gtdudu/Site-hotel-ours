var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	images: {
		type: [String],
	}
});

module.exports = mongoose.model('Gallery', GallerySchema);
