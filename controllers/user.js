const Users = require("../models").user;
const bcrypt = require("bcryptjs");
const { handleError, ErrorHandler } = require("../helper/error");

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
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

// Sign In
// exports.signIn = (req, res, next) => {
//   Users.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(data => {
//       if (data) {
//         const authorized = bcrypt.compareSync(req.body.password, data.password);
//         if (authorized) {
//           res.status(200).send({
//             email: data.email,
//             message: "Login Successfuly!"
//           });
//         } else {
//           res.status(401).json({
//             message: "Wrong Password!"
//           });
//         }
//       }
//     })
//     .catch(() => {
//       throw new ErrorHandler(500, "Internal server error");
//     });
// };

exports.signIn = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      throw new ErrorHandler(403, "You are not registered! Please signup.");
    } else {
      Users.findOne({
        where: {
          email: req.body.email
        }
      }).then(data => {
        if (data) {
          const authorized = bcrypt.compareSync(
            req.body.password,
            data.password
          );
          if (authorized) {
            res.status(200).send({
              message: "Login Successfuly!",
              email: data.email
            });
          } else {
            res.status(401).json({
              message: "Wrong Password!"
            });
          }
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.findOne({
        where: {
          id: userId
        }
      }).then(data => {
        res.status(200).send({
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      id: userId
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
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
      ).then(data => {
        res.status(200).send({
          message: "User has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
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

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.destroy({
        where: {
          id: userId
        }
      }).then(data => {
        res.status(200).send({
          message: "User has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
