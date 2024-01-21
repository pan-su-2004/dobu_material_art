$(document).ready(function () {
  addUserData();
});

//  Add the user data to the table
function addUserData() {
  var users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    $("#tbody").empty();
    users.forEach(function (item, index) {
      var tableRow = `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.classes}</td>
          <td>${item.gender}</td>
          <td>${item.password}</td>
          <td style='cursor:pointer; color: blue;' onclick='editUserData(${index})'><i class="fa-solid fa-user-pen fa-bounce edit" ></i>Edit</td>
          <td style='cursor:pointer; color: red;' onclick='confirmDelete(${index})'><i class="fa-sharp fa-solid fa-trash fa-shake delete"></i>Delete</td>
          </tr>
          `;
      // <td><i class="fa-solid fa-trash delete"onclick='confirmDelete(${index})' ></i></td>
      // <td><i class="fa-solid fa-user-pen edit"onclick='editUserData(${index})' ></i></td>
      $("#tbody").append(tableRow);
    });

    $("#tbody").append(
      `<tr> <td id='addUser' onclick='addButtonToAddUserData()'>Add New User <i class="fa-solid fa-user-plus fa-beat"></i> </td> </tr>`
    );
    // `<tr> <td id='addUser' onclick='addButtonToAddUserData()'>Add New User <i class="fa-solid fa-user-plus"></i> </td> </tr>`
  }
}

// Confirmation before deleting the item
function confirmDelete(index) {
  const isConfirmation = confirm(
    "Are you sure to delete the user id " + (index + 1) + "?"
  );

  if (isConfirmation) {
    deleteUserData(index);
    const delete_con = $(".delete_container");
    delete_con.addClass("show_delete");

    setTimeout(function () {
      delete_con.removeClass("show_delete");
    }, 3000);
  }
}

//  Delete the User Data
function deleteUserData(index) {
  const users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    users.splice(index, 1);

    localStorage.setItem("userData", JSON.stringify(users));
  }

  addUserData();
}

//  Edit the user data
function editUserData(index) {
  const users = JSON.parse(localStorage.getItem("userData"));
  if (users != null) {
    const userData = users[index];

    // Display the edit form
    const editFormContainer = $("#edit_form_container");
    editFormContainer.css("display", "block");

    const editForm = $("#editForm");

    // Populate form fields with existing user data
    $("#newName").val(userData.name);
    $("#newEmail").val(userData.email);
    $(`input[name="radioNew"][value="${userData.gender}"]`).prop(
      "checked",
      true
    );

    // Handle form submission
    const formSubmitHandler = function (event) {
      event.preventDefault();

      // Get the updated values from the form fields
      const newName = $("#newName").val();
      const newEmail = $("#newEmail").val();
      const newGender = $("input[name='radioNew']:checked").val();

      // Update the user data if all fields are filled
      if (newName && newEmail && newGender) {
        userData.name = newName;
        userData.email = newEmail;
        userData.gender = newGender;

        // Update the localStorage and refresh the displayed user data
        localStorage.setItem("userData", JSON.stringify(users));
        addUserData();
        const changed_con = $(".changed_container");
        changed_con.addClass("show_changed");

        setTimeout(function () {
          changed_con.removeClass("show_changed");
        }, 3000);

        // Hide the edit form
        editFormContainer.css("display", "none");

        editForm.off("submit", formSubmitHandler);
      } else {
        const fail_con = $(".fail_container");

        fail_con.addClass("show_fail");
        setTimeout(function () {
          fail_con.removeClass("show_fail");
        }, 3000);
      }
    };

    editForm.on("submit", formSubmitHandler);
  }
}

// Add new user data
function addButtonToAddUserData() {
  // Reset form and remove invalid classes
  $("#name").val("").removeClass("invalid");
  $("#email").val("").removeClass("invalid");
  $("#password").val("").removeClass("invalid");
  $(".gender_field").removeClass("invalid");

  const addFormContainer = $("#add_form_container");
  addFormContainer.css("display", "block");

  const addForm = $("#addForm");

  const formAddUserHandler = function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const gender = $("input[name='radio']:checked").val();

    // Validate the form
    let valid = true;

    if (!name) {
      $("#name").addClass("invalid");
      valid = false;
    }

    if (!email) {
      $("#email").addClass("invalid");
      valid = false;
    }

    if (!password) {
      $("#password").addClass("invalid");
      valid = false;
    }

    if (!gender) {
      $(".gender_field").addClass("invalid");
      valid = false;
    }

    if (valid) {
      const existingData = JSON.parse(localStorage.getItem("userData")) || [];
      const newUserData = {
        name: name,
        email: email,
        password: password,
        gender: gender,
      };

      existingData.push(newUserData);

      localStorage.setItem("userData", JSON.stringify(existingData));

      const success_con = $(".success_container");
      success_con.addClass("show_success");
      setTimeout(function () {
        success_con.removeClass("show_success");
      }, 3000);

      // Reset the form fields
      $("#name").val("");
      $("#email").val("");
      $("#password").val("");
      $("input[name='radio']:checked").prop("checked", false);

      // Refresh the displayed user data
      addUserData();
      addFormContainer.css("display", "none");
      // console.log(valid);

      addForm.off("submit", formAddUserHandler);
    } else {
      console.log(valid);
      const fail_con = $(".fail_container");
      fail_con.addClass("show_fail");

      setTimeout(function () {
        fail_con.removeClass("show_fail");
      }, 3000);
    }
  };

  addForm.on("submit", formAddUserHandler);
}

// Close add Form  Button
$(document).ready(function () {
  $("#closeButton").on("click", function () {
    $("#add_form_container").hide();
  });
});

// close edit form button
$(document).ready(function () {
  $("#closeButtonEdit").on("click", function () {
    $("#edit_form_container").hide();
  });
});
