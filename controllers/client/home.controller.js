const Categories = require("../../models/categories.model");

module.exports.home = async (req, res) => {
  const categories = await Categories.find({ deleted: false });
  res.render("client/pages/home/home.pug", {
    pageTitle: "Trang chủ",
  });
};
