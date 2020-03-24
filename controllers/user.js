const user = require("../models/tb_user");
const bcrypt = require("bcryptjs");
const jwt = require("json-web-token");
const secret = require("../config/config");

exports.signUp = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      role: "user"
    })
    .then(result => {
      const token = jwt.sign(
        {
          id: result.id
        },
        //1. secret variabel yang di inisialisasi di atas
        //2. diambil config.js
        secret.secret
      );
      res.status(201).send({
        email: result.email,
        token,
        message: "User has been registered!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: "Error"
      });
    });

  // user
  //   .create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: bcrypt.hashSync(req.body.password, salt),
  //     role: "user"
  //   })
  //   .then(result => {
  //     const token = jwt.sign(
  //       {
  //         id: result.id
  //       },
  //       //1. secret variabel yang di inisialisasi di atas
  //       //2. diambil config.js
  //       secret.secret
  //     );
  //     res.status(201).send({
  //       email: result.email,
  //       token,
  //       message: "User has been registered!"
  //     });
  //   })
  //   .catch(err => {
  //     err.status(500).json({
  //       message: "Error"
  //     });
  //   });
};
