const jwt = require("json-web-token");
const secret = require("../config/config");

exports.authorized = (req, res, next) => {
  let authHeader = req.headers("authorization");

  if (!authHeader) return next(new Error("Authorization needed!"));

  let token = authHeader.split("Bearer ")[1];

  jwt.verify(token, secret.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: `Authentication error ${err}`
      });
    }

    req.userId = decoded.id;
    next();
  });
};
