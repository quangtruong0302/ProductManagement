const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = 3000;
const Router = require("./routes/index");

const database = require("./config/database");
database.connect();

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("views engine", "pug");
app.use(express.static(`${__dirname}/public`));

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("quangtruong1703"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

const moment = require("moment");
app.locals.moment = moment;

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

Router(app);
app.listen(3000, () => {
  console.log(`http://localhost:${PORT}`);
});
