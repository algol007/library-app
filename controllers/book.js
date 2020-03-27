const Books = require("../models").book;
const Category = require("../models").category;
const { Op } = require("sequelize");

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
      }
    })
      .then(data => {
        res.status(200).send({
          books: data
          // message: orderByTitle
        });
      })
      .catch(err => {
        err.status(500).json({
          message: `Error ${err}`
        });
      });
  } else if (orderByAuthor) {
    Books.findAll({
      order: [["author", orderByAuthor]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
      .then(data => {
        res.status(200).send({
          books: data
          // message: orderByTitle
        });
      })
      .catch(err => {
        err.status(500).json({
          message: `Error ${err}`
        });
      });
  } else if (orderByYear) {
    Books.findAll({
      order: [["publishedAt", orderByYear]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
      .then(data => {
        res.status(200).send({
          books: data
          // message: orderByTitle
        });
      })
      .catch(err => {
        err.status(500).json({
          message: `Error ${err}`
        });
      });
  } else if (search) {
    Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
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
      .catch(err => {
        err.status(500).json({
          message: `Error ${err}`
        });
      });
  } else {
    Books.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
      // include: {
      // Category.findAll();
      // }
    })
      .then(data => {
        res.status(200).send({
          books: data
        });
      })
      .catch(err => {
        err.status(500).json({
          message: `Error ${err}`
        });
      });
  }
};

exports.searchBooks = (req, res, next) => {
  const result = req.params.search;
  Books.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      [Op.or]: [
        { title: { [Op.substring]: result } },
        { description: { [Op.substring]: result } }
      ]
    }
  })
    .then(data => {
      res.status(200).send({
        books: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.getBookById = (req, res, next) => {
  console.log("Get book data by Id");

  const bookId = req.params.bookId;
  // console.log(eventName);
  Books.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      id: bookId
    }
  })
    .then(data => {
      res.status(200).send({
        data: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
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
    .then(result => {
      res.status(201).send({
        message: "Book has been added!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
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
  )
    .then(data => {
      res.status(200).send({
        message: "Book has been updated!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
  Books.destroy({
    where: {
      id: bookId
    }
  })
    .then(data => {
      res.status(200).send({
        message: "Book has been deleted!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};
