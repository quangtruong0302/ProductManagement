const Product = require("../../models/products.model");
const pagination = require("../../helpers/pagination");
const search = require("../../helpers/search");
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
  res.render("admin/pages/products/products.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    pagination: objPagination,
    countTrash: countTrash,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm sảm phẩm",
  });
};

module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (!req.body.position) {
      const countProduct = await Product.countDocuments();
      req.body.position = countProduct + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const product = new Product(req.body);
    await product.save();
    console.log(req.body);
    req.flash("success", "Thêm sản phẩm thành công");
    res.redirect("/admin/products");
  } catch (error) {}
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
    await Product.updateOne({ _id: req.params.id }, { deleted: true });
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
