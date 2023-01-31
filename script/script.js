$('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})

// Validation function to be called on form submit
function validateForm() {
    // Get the form inputs
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirm").value;

    // Check if email is in correct format
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      alert("Invalid email address");
      return false;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }

    // Check if password and passwordConfirm match
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  }