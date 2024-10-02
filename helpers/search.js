module.exports = (query) => {
  let objSearch = {
    keyword: "",
  };
  if (query.search) {
    objSearch.keyword = query.search;
    const regex = new RegExp(objSearch.keyword, "i");
    objSearch.regex = regex;
  }
  return objSearch;
};

// // Xử lí xem trước ảnh
// function previewImage(event) {
//   const input = event.target;
//   const preview = document.getElementById("imagePreview");
//   const file = input.files[0];

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       preview.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   } else {
//     preview.src = "";
//   }
// }
