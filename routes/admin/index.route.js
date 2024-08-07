const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
const roleRoutes = require("./role.route");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);
  app.use("/admin/products", productsRoute);
  app.use("/admin/categories", categoriesRoute);
  app.use("/admin/role", roleRoutes);
};
