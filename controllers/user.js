const Users = require("../models").user;
const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");
// const config = require("../config/secret.js");

exports.signUp = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  Users.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    image: req.body.image,
    role: req.body.role || "user",
    is_active: 1
  })
    .then(result => {
      res.status(201).send({
        email: result.email,
        message: "User has been created!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

// Sign In
exports.signIn = (req, res, next) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      if (data) {
        const authorized = bcrypt.compareSync(req.body.password, data.password);
        if (authorized) {
          res.status(200).send({
            email: data.email,
            message: "Login Successfuly!"
          });
        } else {
          res.status(401).json({
            message: "Wrong Password!"
          });
        }
      }
    })
    .catch(err => {
      err.status(404).json({
        message: `User not found!`
      });
    });
};

exports.updateUser = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const userId = req.params.userId;
  Users.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      image: req.body.image,
      role: req.body.user || "user",
      is_active: 1
    },
    {
      where: {
        id: userId
      }
    }
  )
    .then(data => {
      res.status(200).send({
        message: "User has been updated!",
        data: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

//===================For admin only========================

exports.getAllUser = (req, res, next) => {
  Users.findAll()
    .then(data => {
      res.status(200).send({
        Users: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.destroy({
    where: {
      id: userId
    }
  })
    .then(data => {
      res.status(200).send({
        message: "User has been deleted!",
        data: `User ID : ${userId}`
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};
