const Product = require("../../models/products.model");
const Categories = require("../../models/categories.model");
const pagination = require("../../helpers/pagination");
const flash = require("express-flash");
const { products } = require("../admin/products.controller");

module.exports.home = async (req, res) => {
  const find = {
    deleted: false,
    status: "active",
  };
  const countProduct = await Product.countDocuments(find);
  const objPagination = pagination(
    {
      currentPage: 1,
      limitItems: 8,
    },
    countProduct,
    req.query
  );

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  res.render("client/pages/products/products.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    pagination: objPagination,
  });
};

module.exports.category = async (req, res) => {
  const category = await Categories.findOne({
    slug: req.params.slug,
    deleted: false,
  });
  const products = await Product.find({ category: category._id });
  console.log(products);
  res.render("client/pages/products/category.pug", {
    pageTitle: "Thể loại",
    products: products,
  });
};
