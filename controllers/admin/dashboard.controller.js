module.exports.dashboard = (req, res) => {
  res.render("admin/pages/dashboard/dashboard.pug", {
    pageTitle: "Trang tổng quan",
  });
};
