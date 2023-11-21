import { updateIcon, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
  updateIcon();

  const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
  myCheckout.init();
  myCheckout.calculateOrdertotal(); // Calculate taxes when the page loads

  // Listen for ZIP code changes to recalculate totals
  document.querySelector("#zip").addEventListener("blur", () => {
    myCheckout.calculateOrdertotal();
  });

  // Listening for click on the button
  document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout.checkout();
  });
});
