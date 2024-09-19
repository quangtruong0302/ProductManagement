const Categories = require("../../models/categories.model");
module.exports.category = async (req, res, next) => {
  const categories = await Categories.find({ deleted: false });
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
  const newCategories = createTree(categories);
  res.locals.layoutCategories = newCategories;
  next();
};
