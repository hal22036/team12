import { loadHeaderFooter, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";
// new Alert();

document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
  updateIcon();

  // Check if the form was submitted (page is reloaded with form data)
  const formSubmitted = sessionStorage.getItem("formSubmitted");

  if (formSubmitted) {
    // Display message
    document.getElementById("subscriptionMessage").style.display = "block";

    // Clear only the 'formSubmitted' item from sessionStorage
    sessionStorage.removeItem("formSubmitted");
  }

  document
    .getElementById("subscribeButton")
    .addEventListener("click", function () {
      // Display the subscription message
      document.getElementById("subscriptionMessage").style.display = "block";

      // Set a flag in sessionStorage indicating that the form was submitted
      sessionStorage.setItem("formSubmitted", "true");
    });

  // Handle page refresh
  window.addEventListener("beforeunload", function () {
    // Clear only the 'formSubmitted' item from sessionStorage on page refresh
    sessionStorage.removeItem("formSubmitted");
  });
});
