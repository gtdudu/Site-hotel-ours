var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	typefr: {
		type: String,
		required: true
	},
	contentfr: {
		type: String,
		required: true
	},
	amnetiesfr: {
    type: [String],
		required: true
  },
	pricefr: {
    type: String,
    required: true
  },
	typeen: {
		type: String,
		required: true
	},
	contenten: {
		type: String,
		required: true
	},
	amnetiesen: {
    type: [String],
		required: true
  },
	priceen: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Room', RoomSchema);
