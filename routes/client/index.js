const homeRoutes = require("../client/home.route");
const productsRoutes = require("../client/products.route");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", productsRoutes);
};
