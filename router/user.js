module.exports = function(app) {
  const controller = require("../controllers/user");

  app.post("/api/library/auth/signup", controller.signUp);
  app.post("/api/library/auth/signin", controller.signIn);
  app.get("/api/library/admin/user", controller.getAllUser);
  app.get("/api/library/user/:userId", controller.getUserById);
  app.put("/api/library/user/:userId", controller.updateUser);
  app.delete("/api/library/admin/user/:userId", controller.deleteUser);
};
