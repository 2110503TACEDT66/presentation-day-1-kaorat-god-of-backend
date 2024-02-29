const mongoose = require('mongoose');

const AppointmenetSchema = new mongoose.Schema({
    apptDate: {
        type: Date,
        require: true
    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require: true
    },
    massageshop: {
        type:mongoose.Schema.ObjectId,
        ref:'Massageshop',
        require: true
    },
    createdAT: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment',AppointmenetSchema);