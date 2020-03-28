const Carts = require("../models").cart;
const Books = require("../models").book;
const Users = require("../models").user;

exports.createCart = (req, res, next) => {
  Carts.create({
    userId: req.body.userId,
    bookId: req.body.bookId,
    quantity: req.body.quantity,
    total: req.body.total
  })
    .then(result => {
      res.status(201).send({
        message: "Book has been added to cart!"
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.getAllCart = (req, res, next) => {
  Carts.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      { model: Books, as: "bookCart", attributes: ["title", "image", "price"] },
      { model: Users, as: "userCart", attributes: ["name"] }
    ]
  })
    .then(data => {
      res.status(200).json({
        carts: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.getCartById = (req, res, next) => {
  const cartId = req.params.cartId;
  Carts.findOne({
    where: {
      id: cartId
    }
  })
    .then(data => {
      res.status(200).json({
        data: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.updateCart = (req, res, next) => {
  const cartId = req.params.cartId;
  Carts.update(
    {
      userId: req.body.userId,
      bookId: req.body.bookId,
      quantity: req.body.quantity,
      total: req.body.total
    },
    {
      where: {
        id: cartId
      }
    }
  )
    .then(data => {
      res.status(200).json({
        data: data,
        message: "Cart has been updated!"
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.cartId;
  Carts.destroy({
    where: {
      id: cartId
    }
  })
    .then(data => {
      res.status(200).json({
        data: data,
        message: "Cart has been deleted!"
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};
