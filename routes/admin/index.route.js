const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);
  app.use("/admin/products", productsRoute);
  app.use("/admin/categories", categoriesRoute);
};
