const md5 = require("md5");
const Accounts = require("../../models/accounts.model");
module.exports.login = (req, res) => {
  if (req.cookies.token) {
    res.redirect("/admin/dashboard");
  } else {
    res.render("admin/pages/auth/login.pug");
  }
};

module.exports.loginPost = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const account = await Accounts.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (account) {
      res.cookie("token", account.token);
      res.redirect("/admin/dashboard");
    } else {
      req.flash("error", "Email hoặc mật khẩu không đúng");
      res.redirect("back");
    }
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng đăng nhập lại");
    res.redirect("/admin/auth/login");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};
