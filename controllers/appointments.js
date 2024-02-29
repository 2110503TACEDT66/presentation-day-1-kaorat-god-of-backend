const Appointment = require('../models/Appointment');
const Massageshop = require('../models/Massageshop');

//@desc     Get all appointments
//@route    GET /api/v1/appointments
//@access   Public
exports.getAppointments = async (req, res, next) => {
    let query;

    if (req.user.role !== 'admin') {
        query = Appointment.find({user: req.user.id}).populate({path: 'massageshop', select: 'name province tel'});
    } else {
        if (req.params.massageshopId) {
            console.log(req.params.massageshopId);
            query = Appointment.find({massageshop: req.params.massageshopId}).populate({path: 'massageshop', select: 'name province tel'});
        } else {
            query = Appointment.find().populate({path: 'massageshop', select: 'name province tel'});
        }
    }

    try {
        const appointments = await query;

        res.status(200).json({success: true, count: appointments.length, data: appointments});
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot find Appointment'});
    }
};

//@desc     Get single appointment
//@route    GET /api/v1/appointments/:id
//@access   Public
exports.getAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate({path: 'massageshop', select: 'name description tel'});

        if (!appointment) {
            return res.status(404).json({success: false, message: `No appointment with the id of ${req.params.id}`});
        }

        res.status(200).json({success: true, data: appointment});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'Cannot find Appointment'});
    }
};

//@desc     Add appointment
//@route    POST /api/v1/massageshops/:massageshopId/appointments
//@access   Private
exports.addAppointment = async (req, res, next) => {
    try {
        req.body.massageshop = req.params.massageshopId;

        const massageshop = await Massageshop.findById(req.params.massageshopId);

        if (!massageshop) {
            return res.status(404).json({success: false, message: `No massageshop with the id of ${req.params.massageshopId}`});
        }

        req.body.user = req.user.id;

        const existedAppointments = await Appointment.find({user: req.user.id});

        if (existedAppointments.length >= 3 && req.user.role !== 'admin') {
            return res.status(404).json({success: false, message: `The user with ID ${req.user.id} has already made 3 appointments`});
        }

        const appointment = await Appointment.create(req.body);

        res.status(201).json({success: true, data: appointment});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'Cannot create Appointment'});
    }
};

//@desc     Update appointment
//@route    PUT /api/v1/appointments/:id
//@access   Public
exports.updateAppointment = async (req, res, next) => {
    try {
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({success: false, message: `No appointment with the id of ${req.params.id}`});
        }

        if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this appointment`});
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({success: true, data: appointment});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'Cannot update Appointment'});
    }
};

//@desc     Delete appointment
//@route    DELETE /api/v1/appointments/:id
//@access   Public
exports.deleteAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({success: false, message: `No appointment with the id of ${req.params.id}`});
        }

        if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this appointment`});
        }

        await appointment.deleteOne();

        res.status(200).json({success: true, data: {}});

    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'Cannot delete Appointment'});
    }
};