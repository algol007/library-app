module.exports = function(app) {
  const controller = require("../controllers/user");

  app.post("/api/auth/signup", controller.signUp);
};
