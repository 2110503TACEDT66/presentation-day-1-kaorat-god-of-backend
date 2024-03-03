const mongoose = require('mongoose');

const MassagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    tel: {
        type: String,
        unique: true,
        required: [true,'Please add your telephone number']
    },
    age: {
        type: String,
        required: [true,'Please add your age']
    },
    massageshop: {
        type:mongoose.Schema.ObjectId,
        ref:'Massageshop',
        require: true
    },
    rating: {
        type: Int8Array,
        required: [true,'Please add rating']
    }
});

module.exports = mongoose.model('Massager',MassagerSchema);