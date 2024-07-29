const express = require("express");
const app = express();
const PORT = 3000;
const Router = require("./routes/index");

app.set("views", `${__dirname}/views`);
app.set("views engine", "pug");
app.use(express.static(`${__dirname}/public`));

Router(app);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
