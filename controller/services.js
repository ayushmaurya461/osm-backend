const mongoose = require("mongoose");
const Service = require("../model/service");

exports.getAllServices = (req, res, next) => {
  Service.find(
    {},
    {
      name: 1,
      image: 1,
      _id: 1,
      overallPriceRange: 1,
      serviceCategories: 1,
      serviceName: 1,
    }
  )
    .then((services) => {
      res.status(200).json({
        message: "Success",
        services: services,
      });
    })
    .catch((err) => {
      res.status(500).json("Something went wrong. try again later.");
    });
};

exports.postService = (req, res, next) => {
  const service = req.body.service;
  const id = req.body.id;
  if (!id || id == 0) {
    const newService = new Service({
      _id: new mongoose.Types.ObjectId(),
      ...service,
    });
    newService
      .save()
      .then((savedService) => {
        res.status(200).json({
          id: savedService._id,
        });
      })
      .catch((err) => {
        res.staus(500).json({
          err: err,
          message: "Something went wrong 44.",
        });
      });
  } else {
    Service.find({ _id: id })
      .then((result) => {
        if (result.length < 1) {
          res.status(200).json({
            message: "Something went wrong. 53",
          });
        } else {
          Service.updateOne({ _id: id }, service, { new: true })
            .then((Updres) => {
              res.status(200).json({
                ...Updres,
                id: id,
              });
            })
            .catch((err) => {
              res.staus(500).json({
                message: "Something went wrong.65",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
          message: "Something went wrong 77",
        });
      });
  }
};

exports.getAService = (req, res, next) => {
  Service.findOne({ _id: req.body.id })
    .then((service) => {
      res.status(202).json({
        service,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

exports.delete = (req, res, next) => {
  Service.remove({ _id: req.body.id }).then((result) => {
    res.status(200).json({ message: "Deleted suceessfully" });
  });
};

exports.update = (req, res, next) => {
  const service = req.body.service;
  Service.updateOne({ _id: id }, service, { new: true })
    .then((service) => {
      res.status(200).json({
        service,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Something went wrong. Try again later.",
      });
    });
};

exports.updateProfileImage = (req, res, next) => {
  Service.updateOne({ _id: req.body.id }, { $set: { image: req.file.path } })
    .then((response) => {
      res.status(200).json({ message: "success", image: req.file.path });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Please try again later",
        err: err,
      });
    });
};
