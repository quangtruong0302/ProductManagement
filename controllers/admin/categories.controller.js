const Categories = require("../../models/categories.model");
module.exports.categories = async (req, res) => {
  const find = {
    deleted: false,
  };

  const countTrash = await Categories.countDocuments({ deleted: true });
  const categories = await Categories.find(find);
  for (const category of categories) {
    if (category.parent != "") {
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
  });
};

module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const createTree = (arr, parentID = "") => {
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
  const createTree = (arr, parentID = "") => {
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

module.exports.delete = async (req, res) => {
  try {
    await Categories.updateOne({ _id: req.params.id }, { deleted: true });
    req.flash("succerss", "Danh mục đã được chuyển vào thùng rác");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
  }
  res.redirect("back");
};
