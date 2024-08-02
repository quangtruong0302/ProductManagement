module.exports.home = (req, res) => {
  res.render("client/pages/home/home.pug", {
    pageTitle: "Trang chủ",
  });
};
