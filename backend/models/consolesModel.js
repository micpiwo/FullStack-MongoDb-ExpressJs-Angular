const mongoose = require('mongoose');

const consolesSchema = new mongoose.Schema({
	_id: {type: String},
	name: {type: String, trim:true},
	description: {type: String, trim:true},
	price: {type: String, trim:true},
	photo: {type: String, trim:true}
});




const Consoles = module.exports = mongoose.model('consoles', consolesSchema,'consoles');