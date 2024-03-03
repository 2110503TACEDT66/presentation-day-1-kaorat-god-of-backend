const express = require('express');
const { getMassager, getMassagers, createMassager, updateMassager, deleteMassager } = require('../controllers/massagers');

const { protect, authorize } = require('../middleware/auth'); 

const router = express.Router({mergeParams: true});

router.route('/')
    .get(getMassagers)
    .post(protect,authorize('admin'),createMassager);
router.route('/:id')
    .get(getMassager)
    .put(protect, authorize('admin'),updateMassager)
    .delete(protect,authorize('admin'),deleteMassager);

module.exports = router;