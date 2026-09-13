(function () {
  "use strict";
  var form = document.querySelector(".auth-form");
  var message = document.querySelector(".auth-message");
  if (!form || !message) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var confirmPassword = form.querySelector("#confirm-password");
    var password = form.querySelector("#password");
    if (confirmPassword && password && confirmPassword.value !== password.value) {
      message.textContent = "Passwords do not match yet.";
      confirmPassword.focus();
      return;
    }

    var mode = form.dataset.mode; // "register" or "login"
    var endpoint = mode === "register" ? "/register" : "/login";

    // Sent as application/x-www-form-urlencoded to match the
    // express.urlencoded() middleware already set up in server.js —
    // no server-side changes needed for this fix.
    var formData = new FormData(form);
    var params = new URLSearchParams();
    formData.forEach(function (value, key) {
      params.append(key, value);
    });

    message.textContent = "Please wait...";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          message.textContent = result.data.message || "Success!";
          window.location.href = result.data.redirect || "/dashboard";
        } else {
          message.textContent = result.data.message || "Something went wrong.";
        }
      })
      .catch(function () {
        message.textContent = "Network error. Please try again.";
      });
  });
})();