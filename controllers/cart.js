const Carts = require("../models").cart;

exports.createCart = (req, res, next) => {
  Carts.create({
    book_id: req.body.book_id,
    quantity: req.body.quantity,
    total: req.body.total
  })
    .then(result => {
      res.status(201).send({
        message: "Book has been added to cart!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.getAllCart = (req, res, next) => {
  Carts.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  })
    .then(data => {
      res.status(200).json({
        carts: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
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
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.updateCart = (req, res, next) => {
  const cartId = req.params.cartId;
  Carts.update(
    {
      book_id: req.body.book_id,
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
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
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
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};
