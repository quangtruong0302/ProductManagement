const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit-permissions]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const rows = tablePermissions.querySelectorAll("tr[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          permissions.push({
            id: input.value,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, idx) => {
          if (input.checked) {
            permissions[idx].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "[form-change-permissions]"
      );
      const input = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      input.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}

const dataRoles = document.querySelector(".data-roles");
if (dataRoles) {
  const newData = JSON.parse(dataRoles.getAttribute("data"));
  const tablePermissions = document.querySelector("[table-permissions]");

  newData.forEach((item, index) => {
    const permissions = item.permissions;
    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
