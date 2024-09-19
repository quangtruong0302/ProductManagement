const Categories = require("../../models/categories.model");
const pagination = require("../../helpers/pagination");
module.exports.categories = async (req, res) => {
  const find = {
    deleted: false,
  };

  const countTrash = await Categories.countDocuments({ deleted: true });
  const countCategories = await Categories.countDocuments({ deleted: false });
  const objPagination = pagination(
    {
      currentPage: 1,
      limitItems: 6,
    },
    countCategories,
    req.query
  );
  const categories = await Categories.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  for (const category of categories) {
    if (category.parent != "empty") {
      const parent = await Categories.findOne({
        _id: category.parent,
      });
      if (parent) {
        category.parentName = parent.title;
      }
    }
  }

  res.render("admin/pages/categories/categories.pug", {
    pageTitle: "Danh mục sản phẩm",
    categories: categories,
    countTrash: countTrash,
    pagination: objPagination,
  });
};

module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const createTree = (arr, parentID = "empty") => {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent === parentID) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  };

  const categories = await Categories.find(find);
  const newCategories = createTree(categories);

  res.render("admin/pages/categories/create.pug", {
    pageTitle: "Thêm mới danh mục",
    categories: newCategories,
  });
};
module.exports.createPost = async (req, res) => {
  try {
    const category = new Categories(req.body);
    await category.save();
    req.flash("success", "Thêm danh mục thành công");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
  }
  res.redirect("/admin/categories");
};

module.exports.edit = async (req, res) => {
  const find = {
    deleted: false,
  };
  const createTree = (arr, parentID = "empty") => {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent === parentID) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  };
  const categories = await Categories.find(find);
  const newCategories = createTree(categories);

  const category = await Categories.findOne({ _id: req.params.id });

  res.render("admin/pages/categories/edit.pug", {
    pageTitle: "Chỉnh sửa danh mục",
    categories: newCategories,
    category: category,
  });
};
module.exports.editPatch = async (req, res) => {
  try {
    await Categories.updateOne({ _id: req.params.id }, { ...req.body });
    req.flash("success", "Cập nhật thông tin thành công");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
  }
  res.redirect("back");
};
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const isParent = await Categories.exists({ parent: id, deleted: false });
    if (isParent) {
      req.flash(
        "error",
        "Danh mục này là danh mục cha, hãy xoá các danh mục con trước"
      );
    } else {
      await Categories.updateOne({ _id: req.params.id }, { deleted: true });
      req.flash("success", "Danh mục đã được chuyển vào thùng rác");
    }
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
  }
  res.redirect("back");
};
