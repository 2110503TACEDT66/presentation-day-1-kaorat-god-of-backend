const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment',AppointmentSchema);