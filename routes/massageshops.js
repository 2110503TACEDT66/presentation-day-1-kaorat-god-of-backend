const express = require('express');
const router = express.Router();
const { getMassageshops, getMassageshop, createMassageshop, updateMassageshop, deleteMassageshop } = require('../controllers/massageshops');
const { protect, authorize } = require('../middleware/auth');

const appointmentRouter = require('./appointments');
const massagerRouter = require('./massagers');

router.use('/:massageshopId/appointments/', appointmentRouter);
router.use('/:massageshopId/massagers/', massagerRouter);


router.route('/')
    .get(getMassageshops)
    .post(protect,authorize('admin'),createMassageshop);
router.route('/:id')
    .get(getMassageshop)
    .put(protect, authorize('admin'),updateMassageshop)
    .delete(protect,authorize('admin'),deleteMassageshop);

module.exports = router;