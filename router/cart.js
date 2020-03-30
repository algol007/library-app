module.exports = function(app) {
  const controller = require("../controllers/cart");

  app.post("/api/library/cart", controller.createCart);
  app.get("/api/library/cart", controller.getAllCart);
  app.get("/api/library/cart/:cartId", controller.getCartById);
  app.put("/api/library/cart/:cartId", controller.updateCart);
  app.delete("/api/library/cart/:cartId", controller.deleteCart);
};
