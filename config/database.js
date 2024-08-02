const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://buiquangtruong170302:quangtruong1703@productmanagement.4ic2vcc.mongodb.net/product_management?retryWrites=true&w=majority&appName=productmanagement"
    );
    console.log("Kết nối cơ sở dữ liệu thành công!!!");
  } catch (error) {
    console.log("Kết nối cơ sở dữ liệu thất bại!!!");
  }
};
