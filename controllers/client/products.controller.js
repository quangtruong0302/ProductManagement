const Product = require("../../models/products.model");
const pagination = require("../../helpers/pagination");

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
