const Product = require("../../models/products.model");
const Categories = require("../../models/categories.model");
const pagination = require("../../helpers/pagination");
const search = require("../../helpers/search");
const { accounts } = require("./accounts.controller");
const Accounts = require("../../models/accounts.model");

module.exports.products = async (req, res) => {
  const find = {
    deleted: false,
  };
  const countTrash = await Product.countDocuments({ deleted: true });
  const countProduct = await Product.countDocuments(find);
  const objPagination = pagination(
    {
      currentPage: 1,
      limitItems: 6,
    },
    countProduct,
    req.query
  );

  if (req.query.status == "active") {
    find.status = "active";
  } else if (req.query.status == "inactive") {
    find.status = "inactive";
  }

  const objSearch = search(req.query); // Tìm kiếm sản phẩm
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  for (const product of products) {
    let categoryName = "empty";
    if (product.category != "empty") {
      const category = await Categories.findOne({
        _id: product.category,
        deleted: false,
      });
      if (category) {
        categoryName = category.title;
      } else {
        categoryName = "empty";
      }
      product.categoryName = categoryName;
    } else {
      product.categoryName = categoryName;
    }

    if (product.createdBy.account_id) {
      const account = await Accounts.findOne({
        _id: product.createdBy.account_id,
      });
      if (account) {
        product.createdByName = account.fullName;
      }
    }
  }
  res.render("admin/pages/products/products.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    pagination: objPagination,
    countTrash: countTrash,
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
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm sảm phẩm",
    categories: newCategories,
  });
};

module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.createdBy = {
      account_id: res.locals.user.id,
    };
    if (!req.body.position) {
      const countProduct = await Product.countDocuments();
      req.body.position = countProduct + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const product = new Product(req.body);
    await product.save();
    req.flash("success", "Thêm sản phẩm thành công");
    res.redirect("/admin/products");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("/admin/products");
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    await Product.updateOne(
      { _id: req.params.id },
      { status: req.params.status }
    );
    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại, vui lòng thử lại!");
    res.redirect("back");
  }
};

module.exports.delete = async (req, res) => {
  try {
    const deletedBy = {
      account_id: res.locals.user.id,
      deletedAt: Date.now(),
    };
    await Product.updateOne(
      { _id: req.params.id },
      { deleted: true, deletedBy: deletedBy }
    );
    req.flash("success", "Sản phẩm đã được chuyển vào thùng rác!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("back");
  }
};

module.exports.trash = async (req, res) => {
  const find = {
    deleted: true,
  };
  if (req.query.status == "active") {
    find.status = "active";
  } else if (req.query.status == "inactive") {
    find.status = "inactive";
  }
  const countProduct = await Product.countDocuments(find);
  const objPagination = pagination(
    {
      currentPage: 1,
      limitItems: 6,
    },
    countProduct,
    req.query
  );
  const objSearch = search(req.query); // Tìm kiếm sản phẩm
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  for (const product of products) {
    let categoryName = "empty";
    if (product.category != "empty") {
      const category = await Categories.findOne({
        _id: product.category,
        deleted: false,
      });
      if (category) {
        categoryName = category.title;
      } else {
        categoryName = "empty";
      }
      product.categoryName = categoryName;
    } else {
      product.categoryName = categoryName;
    }

    if (product.deletedBy.account_id) {
      const account = await Accounts.findOne({
        _id: product.deletedBy.account_id,
      });
      if (account) {
        product.deletedByName = account.fullName;
      }
    }
  }

  res.render("admin/pages/products/trash.pug", {
    pageTitle: "Thùng rác",
    products: products,
    pagination: objPagination,
  });
};

module.exports.restore = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, { deleted: false });
    req.flash("success", "Khôi phục sản phẩm thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("back");
  }
};
module.exports.formPermanentDelete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    req.flash("success", "Xoá sản phẩm thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    res.redirect("back");
  }
};

module.exports.changeMulti = async (req, res) => {
  const ids = req.body["value-submit"].split(", ");
  const typeChange = req.body["type-change"];
  try {
    switch (typeChange) {
      case "delete_all":
        await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
        req.flash("success", "Các sản phẩm đã được chuyển vào thùng rác");
        break;
      case "active_all":
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        req.flash("success", "Cập nhật trạng thái thành công");
        break;
      case "inactive_all":
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        req.flash("success", "Cập nhật trạng thái thành công");
        break;
      case "restore_all":
        await Product.updateMany({ _id: { $in: ids } }, { deleted: false });
        req.flash("success", "Các sản phẩm đã được khôi phục");
        break;
      case "permanentDelete_all":
        await Product.deleteMany({ _id: { $in: ids } });
        req.flash("success", "Các sản phẩm đã được xoá vĩnh viễn");
        break;
      default:
        break;
    }
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi, vui lòng thử lại");
    req.redirect("back");
  }
};

module.exports.edit = async (req, res) => {
  try {
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
    const product = await Product.findOne({ _id: req.params.id });
    res.render("admin/pages/products/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      categories: newCategories,
    });
  } catch (error) {}
};

module.exports.editPatch = async (req, res) => {
  req.body.position = parseInt(req.body.position);
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  try {
    await Product.updateOne({ _id: req.params.id }, { ...req.body });
    req.flash("success", "Cập nhật thông tin sản phẩm thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Đã xảy ra lỗi vui lòng thử lại");
    res.redirect("back");
  }
};
