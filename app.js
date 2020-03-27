const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());

require("./router/user")(app);
require("./router/book")(app);
require("./router/category")(app);
require("./router/cart")(app);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.unsubscribe((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
