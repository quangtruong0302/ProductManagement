// Xử lí phân trang
const pagination = document.querySelectorAll("[button-pagination]");
const buttonNext = document.querySelector("[button-next]");
const buttonPrevsios = document.querySelector("[button-previous]");
if (pagination) {
  let url = new URL(window.location.href);
  pagination.forEach((button) => {
    button.addEventListener("click", () => {
      let page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url;
    });
  });
}

// Xử lí tìm kiếm
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("search", keyword);
    } else {
      url.searchParams.delete("search");
    }
    window.location.href = url;
  });
}

// Xử lí chọn nhiều sản phẩm
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const checkAll = document.querySelector("input[name='check-all']");
  const checkSingle = document.querySelectorAll("input[name='id']");
  // Xử lí chọn check-all
  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      checkSingle.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
  // Xử lí chọn từng checkbox
  checkSingle.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const countCheckbox = document.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countCheckbox == checkSingle.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}

// Xử lí thay đổi trạng thái sản phẩm
const changeStatus = document.querySelectorAll("[data-status]");
if (changeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  console.log(formChangeStatus);
  changeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm(
        "Bạn muốn thay đổi trạng thái của sản phẩm này?"
      );
      if (isConfirm) {
        const data = button.getAttribute("data-status");
        const id = button.getAttribute("data-id");

        const statusChange = data === "active" ? "inactive" : "active";

        const action = `/admin/products/change-status/${statusChange}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => {
      $(alert).alert("close");
    }, 3000);
  });

  // Xử lý sự kiện đóng thủ công
  const closeButtons = document.querySelectorAll(".alert .close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      $(button.closest(".alert")).alert("close");
    });
  });
});

// Xử lí xoá sản phẩm (Xoá mềm)
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn xoá sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `/admin/products/delete/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}

// Xử lí khôi phục
const buttonRestore = document.querySelectorAll("[button-restore]");
if (buttonRestore.length > 0) {
  const formRestore = document.querySelector("#form-restore");
  buttonRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn khôi phục sản phẩm này");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `/admin/products/restore/${id}?_method=PATCH`;
        formRestore.action = action;
        formRestore.submit();
      }
    });
  });
}

// Xử lí xoá vĩnh viễn
const permanentDelete = document.querySelectorAll("[permanent-Delete]");
if (permanentDelete.length > 0) {
  const formPermanentDelete = document.querySelector("#form-permanent-delete");
  permanentDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn muốn xoá vĩnh viễn sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `/admin/products/formPermanentDelete/${id}?_method=DELETE`;
        formPermanentDelete.action = action;
        formPermanentDelete.submit();
      }
    });
  });
}

// Xử lí xem trước ảnh
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const inputImage = uploadImage.querySelector(".input-image");
  const imagePreview = uploadImage.querySelector(".image-preview");
  const buttonDeleteImagePreview = document.querySelector(
    ".delete-image-preview"
  );
  const container = document.querySelector(".container-image-preview");
  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
    buttonDeleteImagePreview.classList.remove("d-none");
    buttonDeleteImagePreview.classList.add("d-block");
    container.classList.remove("d-none");
    container.classList.add("d-block");
  });
  // Xử lí xóa ảnh xem trước
  if (buttonDeleteImagePreview) {
    buttonDeleteImagePreview.addEventListener("click", () => {
      inputImage.value = "";
      imagePreview.src = "";
      buttonDeleteImagePreview.classList.remove("d-block");
      buttonDeleteImagePreview.classList.add("d-none");
      container.classList.remove("d-block");
      container.classList.add("d-none");
    });
  }
}
