var mongoose = require('mongoose');

var TourismSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
  link: {
    type: String,
  },
	image: {
		type: String,
	}
});

module.exports = mongoose.model('Tourism', TourismSchema);
