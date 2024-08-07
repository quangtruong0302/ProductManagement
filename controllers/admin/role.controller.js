const { model } = require("mongoose");
const Roles = require("../../models/roles.model");

module.exports.role = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roles = await Roles.find(find);

  res.render("admin/pages/role/role.pug", {
    pageTitle: "Danh sách nhóm quyền",
    roles: roles,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/role/create.pug", {
    pageTitle: "Thêm mới nhóm quyền",
  });
};

module.exports.createPost = async (req, res) => {
  try {
    const role = new Roles(req.body);
    await role.save();
    req.flash("success", "Thêm nhóm quyền thành công");
    res.redirect("/admin/role");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("back");
  }
};

module.exports.permissions = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roles = await Roles.find(find);
  res.render("admin/pages/role/permissions.pug", {
    pageTitle: "Phân quyền",
    roles: roles,
  });
};

module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Roles.updateOne(
        { _id: item.id },
        { permissions: item.permissions }
      );
    }
    req.flash("success", "Cập nhật phân quyền thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("back");
  }
};
