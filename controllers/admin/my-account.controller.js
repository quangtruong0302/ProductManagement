const Account = require("../../models/accounts.model");
const md5 = require("md5");
module.exports.myAccount = (req, res) => {
  res.render("admin/pages/my-account/my-account.pug", {
    pageTitle: "Thông tin tài khoản",
  });
};
module.exports.edit = async (req, res) => {
  const account = await Account.findOne({ _id: res.locals.user.id });
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Cập nhật thông tin",
    account: account,
  });
};

module.exports.editPatch = async (req, res) => {
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  try {
    await Account.updateOne({ _id: res.locals.user.id }, { ...req.body });
    req.flash("success", "Cập nhật thông tin thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại.");
    res.redirect("back");
  }
};
