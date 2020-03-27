const Categories = require("../models").category;

// Get all categories data
// exports.getAllCategories = (req, res, next) => {
//   console.log("Get all categories");
//   Categories.findAll(
//     // { limit: 3 },
//     {
//       attributes: {
//         exclude: ["createdAt", "updatedAt"]
//       }
//     }
//   )
//     .then(data => {
//       res.status(200).send({
//         categories: data
//       });
//     })
//     .catch(err => {
//       err.status(500).json({
//         message: `Error ${err}`
//       });
//     });
// };

exports.getAllCategories = (req, res, next) => {
  console.log("Get all categories");
  Categories.findAll(
    // { limit: 3 },
    {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  )
    .then(data => {
      res.status(200).send({
        categories: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.getCategoryById = (req, res, next) => {
  const categoryId = req.params.categoryId;
  // console.log(eventName);
  Categories.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      id: categoryId
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

exports.createCategory = (req, res, next) => {
  console.log("Category has been created!");
  Categories.create({
    name: req.body.name
  })
    .then(result => {
      res.status(201).send({
        message: "New category added!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.updateCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  // console.log(eventName);
  Categories.update(
    {
      name: req.body.name
    },
    {
      where: {
        id: categoryId
      }
    }
  )
    .then(data => {
      res.status(200).send({
        data: data,
        message: "Category has been updated!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  // console.log(eventName);
  Categories.destroy({
    where: {
      id: categoryId
    }
  })
    .then(data => {
      res.status(200).send({
        data: data,
        message: "Category has been deleted!"
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};
