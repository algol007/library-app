const Books = require("../models").book;
const Category = require("../models").category;
const { Op } = require("sequelize");
const { handleError, ErrorHandler } = require("../helper/error");

// Get all books data
exports.getAllBooks = (req, res, next) => {
  // console.log("Get all books data");
  const orderByTitle = req.query.title;
  const orderByAuthor = req.query.author;
  const orderByYear = req.query.year;
  const search = req.query.search;

  if (orderByTitle) {
    Books.findAll({
      order: [["title", orderByTitle]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: { model: Category, as: "bookCategory", attributes: ["name"] }
    })
      .then(data => {
        res.status(200).send({
          message: "Order book by title",
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (orderByAuthor) {
    Books.findAll({
      order: [["author", orderByAuthor]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: { model: Category, as: "bookCategory", attributes: ["name"] }
    })
      .then(data => {
        res.status(200).send({
          message: "Order book by author",
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (orderByYear) {
    Books.findAll({
      order: [["publishedAt", orderByYear]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: { model: Category, as: "bookCategory", attributes: ["name"] }
    })
      .then(data => {
        res.status(200).send({
          message: "Order book by year published",
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (search) {
    Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      where: {
        [Op.or]: [
          { title: { [Op.substring]: search } },
          { description: { [Op.substring]: search } }
        ]
      }
    })
      .then(data => {
        res.status(200).send({
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else {
    Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: { model: Category, as: "bookCategory", attributes: ["name"] }
    })
      .then(data => {
        res.status(200).send({
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  }
};

exports.getBookById = async (req, res, next) => {
  // console.log("Get book data by Id");
  const bookId = req.params.bookId;
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.findOne({
        where: {
          id: bookId
        }
      }).then(data => {
        res.status(200).json({
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getBooksByCategory = (req, res, next) => {
  // console.log("Get all books data");
  const categoryId = req.params.categoryId;

  Books.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      categoryId: categoryId
    }
  })
    .then(data => {
      res.status(200).send({
        books: data
        // message: orderByTitle
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.createBook = (req, res, next) => {
  Books.create({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    isbn: req.body.isbn,
    isAvailable: 1,
    totalPage: req.body.totalPage,
    categoryId: req.body.categoryId,
    price: req.body.price,
    description: req.body.description,
    language: req.body.language,
    publishedBy: req.body.publishedBy,
    publishedAt: req.body.publishedAt
  })
    .then(data => {
      res.status(201).send({
        message: "Book has been added!",
        data: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.update(
        {
          title: req.body.title,
          image: req.body.image,
          author: req.body.author,
          isbn: req.body.isbn,
          isAvailable: 1,
          totalPage: req.body.totalPage,
          categoryId: req.body.categoryId,
          price: req.body.price,
          description: req.body.description,
          language: req.body.language,
          publishedBy: req.body.publishedBy,
          publishedAt: req.body.publishedAt
        },
        {
          where: {
            id: bookId
          }
        }
      ).then(data => {
        res.status(200).send({
          message: "Book has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.destroy({
        where: {
          id: bookId
        }
      }).then(data => {
        res.status(200).send({
          message: "Book has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
