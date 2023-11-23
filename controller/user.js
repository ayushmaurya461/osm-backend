const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
jetKey = require("../nodemon.json");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          status: false,
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: "Something went wrong",
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.email,
              email: req.body.email,
              mobile: req.body.mobile,
              password: hash,
              userType: 0,
            });
            user
              .save()
              .then((savedUser) => {
                const token = jwt.sign(
                  {
                    email: savedUser.email,
                    userId: savedUser._id,
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "2h",
                  }
                );
                res.status(200).json({
                  name: savedUser.name,
                  id: savedUser._id,
                  email: savedUser.email,
                  token: token,
                  userType: savedUser.userType,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  status: false,
                  message: "Something went wrong. Try again Later.",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong.",
      });
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Invalid email or password",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              message: "Invalid email or password",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );

            res.status(200).json({
              email: user[0].email,
              token: token,
              name: user[0].name,
              id: user[0]._id,
              userType: user[0].userType,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProfileImage = (req, res, next) => {
  User.updateOne({ _id: req.body.id }, { $set: { image: req.file.path } })
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

exports.getAUser = (req, res, next) => {
  User.findOne({ _id: req.body.id })
    .then((user) => {
      res.status(200).json({
        id: user.id,
        email: user.email,
        mobile: user.mobile,
        userType: user.userType,
        city: user.city,
        state: user.state,
        image: user.image,
        address: user.address,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

exports.update = (req, res, next) => {
  User.updateOne(
    { _id: req.body.id },
    {
      $set: {
        mobile: req.body.user.mobile,
        email: req.body.user.email,
        city: req.body.user.city,
        state: req.body.user.state,
        address: req.body.user.address,
      },
    }
  )
    .then((response) => {
      User.findOne({ _id: req.body.id })
        .then((user) => {
          res.status(200).json({
            message: "Updated",
            user: {
              id: user.id,
              email: user.email,
              mobile: user.mobile,
              userType: user.userType,
              city: user.city,
              state: user.state,
              image: user.image,
              address: user.address,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({ message: "Please try agaain later." });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Please try agaain later." });
    });
};

exports.changeUserType = (req, res, next) => {
  User.updateOne(
    { _id: req.body.id },
    { $set: { userType: req.body.userType } }
  )
    .then((response) => {
      if (response.modifiedCount) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(500).json({
          message: "Try again later",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Try again later",
      });
    });
};

exports.updateService = (req, res, next) => {
  User.updateOne({ _id: req.body.id }, { $set: { service: req.body.service } })
    .then((response) => {
      if (response.modifiedCount) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(500).json({
          message: "Try again later",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Try again later",
      });
    });
};

exports.validateUser = (req, res, next) => {
  res.status(200).json({
    token_verified: true,
  });
};

exports.delete = (req, res, next) => {
  User.remove({ _id: req.body.id }).then((result) => {
    res.status(200).json({ message: "User deleted suceessfully" });
  });
};
