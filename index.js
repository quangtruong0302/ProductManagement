const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const Router = require("./routes/index");

app.set("views", `${__dirname}/views`);
app.set("views engine", "pug");
app.use(express.static(`${__dirname}/public`));

Router(app);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
