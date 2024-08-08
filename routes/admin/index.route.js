const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
const roleRoutes = require("./role.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);
  app.use("/admin/products", productsRoute);
  app.use("/admin/categories", categoriesRoute);
  app.use("/admin/role", roleRoutes);
  app.use("/admin/accounts", accountsRoutes);
  app.use("/admin/auth", authRoutes);
};
