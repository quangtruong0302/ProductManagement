const clientRoutes = require("./client/index");

module.exports = (app) => {
  clientRoutes(app);
};
