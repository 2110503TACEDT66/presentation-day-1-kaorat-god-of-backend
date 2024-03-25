const Massager = require("../models/Massager");
const Massageshop = require("../models/Massageshop");

//@desc     Get all massagers
//@route    GET /api/v1/massagers
//@access   Public
exports.getMassagers = async (req, res, next) => {
    try {
        const massagers = await Massager.find().populate({path: 'massageshop', select: 'name province tel'});

        res.status(200).json({success: true, count: massagers.length, data: massagers});
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({success: false, message: 'Cannot find Appointment'});
    }
};

//@desc     Get single massager
//@route    GET /api/v1/massagers/:id
//@access   Public
exports.getMassager = async (req, res, next) => {
  try {
    const massager = await Massager.findById(req.params.id);

    if (!massager) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, data: massager });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Add massager
//@route    POST /api/v1/massageshops/:massageshopId/massagers
//@access   Private
exports.createMassager = async (req, res, next) => {
  try {
    req.body.massageshop = req.params.massageshopId;

    const massageshop = await Massageshop.findById(req.params.massageshopId);

    if (!massageshop) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No massageshop with the id of ${req.params.massageshopId}`,
        });
    }

    req.body.user = req.user.id;

    const massager = await Massager.create(req.body);

    res.status(201).json({ success: true, data: massager });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Massager" });
  }
};

//@desc     Update massager
//@route    PUT /api/v1/massagers/:id
//@access   Private
exports.updateMassager = async (req, res, next) => {
  try {
    const massager = await Massager.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!massager) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, data: massager });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete massager
//@route    DELETE /api/v1/massgers/:id
//@access   Private
exports.deleteMassager = async (req, res, next) => {
  try {
    const massager = await Massager.findById(req.params.id);

    if (!massager) {
      return res
        .status(404)
        .json({
          success: false,
          massage: `Bootcamp not found with id of ${req.params.id}`,
        });
    }

    await massager.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
