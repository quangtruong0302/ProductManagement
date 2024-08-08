const Accounts = require("../../models/accounts.model");
const Roles = require("../../models/roles.model");
const generateRandomSring = require("../../helpers/generateString");
const md5 = require("md5");
const flash = require("express-flash");

module.exports.accounts = async (req, res) => {
  const find = {
    deleted: false,
  };
  const accounts = await Accounts.find(find).select("-password -token");
  for (const account of accounts) {
    const roleID = account.role;
    const role = await Roles.findOne({ _id: roleID });
    account.roleName = role.title;
  }
  res.render("admin/pages/accounts/accounts.pug", {
    pageTitle: "Danh sách tài khoản",
    accounts: accounts,
  });
};

module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roles = await Roles.find(find);
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};
module.exports.createPost = async (req, res) => {
  try {
    const emailExist = await Accounts.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", "Địa chỉ Email đã được sử dụng");
      res.redirect("back");
    } else {
      req.body.token = generateRandomSring.generateRandomSring(20);
      req.body.password = md5(req.body.password);
      const account = new Accounts(req.body);
      await account.save();
      res.redirect("/admin/accounts");
    }
  } catch (error) {}
};

module.exports.edit = async (req, res) => {
  const account = await Accounts.findOne({ _id: req.params.id });
  const roles = await Roles.find({ deleted: false });
  res.render("admin/pages/accounts/edit.pug", {
    pageTitle: "Chỉnh sửa tài khoản",
    account: account,
    roles: roles,
  });
};

module.exports.editPatch = async (req, res) => {
  try {
    const emailExist = await Accounts.findOne({
      _id: { $ne: req.params.id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại");
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Accounts.updateOne({ _id: req.params.id }, req.body);
      req.flash("success", "Cập nhật thông tin thành công");
    }
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
  }
  res.redirect("back");
};
