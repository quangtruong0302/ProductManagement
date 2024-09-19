const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
const roleRoutes = require("./role.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
const myAccountRoutes = require("./my-account");

const middleware = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
  app.use("/admin/dashboard", middleware.requireAuth, dashboardRoute);
  app.use("/admin/products", middleware.requireAuth, productsRoute);
  app.use("/admin/categories", middleware.requireAuth, categoriesRoute);
  app.use("/admin/role", middleware.requireAuth, roleRoutes);
  app.use("/admin/accounts", middleware.requireAuth, accountsRoutes);
  app.use("/admin/auth", authRoutes);
  app.use("/admin/my-account", middleware.requireAuth, myAccountRoutes);
};
