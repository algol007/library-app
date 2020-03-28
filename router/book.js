module.exports = function(app) {
  const controller = require("../controllers/book");

  app.post("/api/library/admin/book", controller.createBook);
  app.get("/api/library/book", controller.getAllBooks);
  app.get(
    "/api/library/book/category/:categoryId",
    controller.getBooksByCategory
  );
  app.get("/api/library/book/:bookId", controller.getBookById);
  app.put("/api/library/admin/book/:bookId", controller.updateBook);
  app.delete("/api/library/admin/book/:bookId", controller.deleteBook);
};
