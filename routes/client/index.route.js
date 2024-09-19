const homeRoutes = require("./home.route");
const productsRoutes = require("./products.route");
const middleware = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use("/", middleware.category, homeRoutes);
  app.use("/products", middleware.category, productsRoutes);
};
