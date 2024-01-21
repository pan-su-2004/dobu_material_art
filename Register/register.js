
document.addEventListener("DOMContentLoaded", function () {
  var joinNowForm = document.getElementById("register-form");

  joinNowForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    const classes = $("#classes").val();
    var password = document.querySelector('input[name="password"]').value;
    var repeatPassword = document.querySelector(
      'input[name="password-repeat"]'
    ).value;
    var gender = document.querySelector('input[name="radio"]:checked').value;

    // Validate the form
    var valid = true;

    if (!name) {
      document.querySelector('input[name="name"]').classList.add("invalid");
      valid = false;
    } else {
      document.querySelector('input[name="name"]').classList.remove("invalid");
    }

    if (!email) {
      document.querySelector('input[name="email"]').classList.add("invalid");
      valid = false;
    } else {
      document.querySelector('input[name="email"]').classList.remove("invalid");
    }

    if (!classes) {
      $(".classes_field").addClass("invalid");
      valid = false;
    } else {
      $(".classes_field").removeClass("invalid");
    }

    if (!password) {
      document.querySelector('input[name="password"]').classList.add("invalid");
      valid = false;
    } else {
      document
        .querySelector('input[name="password"]')
        .classList.remove("invalid");
    }

    console.log(repeatPassword == password);

    if (!repeatPassword || repeatPassword !== password) {
      document
        .querySelector('input[name="password-repeat"]')
        .classList.add("invalid");
      alert("Password is not the same");
      valid = false;
    } else {
      document
        .querySelector('input[name="password-repeat"]')
        .classList.remove("invalid");
    }

    if (!gender) {
      document.querySelector(".gender_field").classList.add("invalid");
      console.log(document.querySelector(".gender_field"));
      valid = false;
    } else {
      document.querySelector(".gender_field").classList.remove("invalid");
    }

    if (valid) {
      const oldUserData = JSON.parse(localStorage.getItem("userData")) || [];

      var userData = {
        name: name,
        email: email,
        password: password,
        gender: gender,
        classes: classes,
      };

      oldUserData.push(userData);

      localStorage.setItem("userData", JSON.stringify(oldUserData));
      window.location.href = "./thankyou.html";
    } else {
      const fail_con = $(".fail_container");

      fail_con.addClass("show_fail");

      setTimeout(function () {
        fail_con.removeClass("show_fail");
      }, 3000);
    }
  });
});
