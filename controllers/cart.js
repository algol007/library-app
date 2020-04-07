const Carts = require("../models").cart;
const Books = require("../models").book;
const Users = require("../models").user;
const { handleError, ErrorHandler } = require("../helper/error");

exports.createCart = (req, res, next) => {
  Carts.create({
    userId: req.body.userId,
    bookId: req.body.bookId,
    quantity: req.body.quantity,
    status: req.body.status
  })
    .then(data => {
      res.status(201).send({
        message: "Book has been added to cart!",
        cart: data
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

exports.getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Carts.findOne({
      where: {
        id: cartId
      }
    });
    if (!cart) {
      throw new ErrorHandler(404, "Cart not found!");
    } else {
      Carts.findOne({
        where: {
          id: cartId
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

exports.updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Carts.findOne({
      where: {
        id: cartId
      }
    });
    if (!cart) {
      throw new ErrorHandler(404, "Cart not found!");
    } else {
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
      ).then(data => {
        res.status(200).json({
          message: "Cart has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Carts.findOne({
      where: {
        id: cartId
      }
    });
    if (!cart) {
      throw new ErrorHandler(404, "Cart not found!");
    } else {
      Carts.destroy({
        where: {
          id: cartId
        }
      }).then(data => {
        res.status(200).json({
          message: "Cart has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
