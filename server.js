const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");

// init app
app.get("/", (req, res) => res.send("Hello World!"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());

require("./router/user")(app);

app.listen(port, () => console.log(`App running on port ${port}!`));
