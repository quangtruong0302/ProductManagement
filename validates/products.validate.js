module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Tên sản phẩm không được bỏ trống!");
    res.redirect("back");
    return;
  }
  if (req.body.title.length < 3) {
    req.flash("error", "Tên sản phẩm phải dài tối thiểu 3 kí tự");
    res.redirect("back");
    return;
  }
  if (req.body.price <= 0) {
    req.flash("error", "Giá sản phẩm không hợp lệ");
    res.redirect("back");
  }
  next();
};
