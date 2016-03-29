var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
  synopsis: {
    type: String,
    required: true
  },
	content: {
		type: String,
		required: true
	},
  price: {
    type: Number,
    required: true
  },
	amneties: {
    type: [String],
  },
  images: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Room', RoomSchema);
