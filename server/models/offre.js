var mongoose = require('mongoose');

var OffreSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Offre', OffreSchema);
