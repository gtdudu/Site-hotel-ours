var mongoose = require('mongoose');

var OffreSchema = new mongoose.Schema({
	titlefr: {
		type: String,
		required: true
	},
	contentfr: {
		type: String,
		required: true
	},
	titleen: {
		type: String,
		required: true
	},
	contenten: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Offre', OffreSchema);
