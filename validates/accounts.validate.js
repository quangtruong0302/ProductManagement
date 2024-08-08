module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Họ và tên không được bỏ trống");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Email không được bỏ trống");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được bỏ trống");
    res.redirect("back");
    return;
  }

  next();
};
