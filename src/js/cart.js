import ShoppingCart, { updateCartTotal } from "./shoppingcart.mjs";
import { loadHeaderFooter, updateIcon } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
  updateIcon();

  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();

  // Wait for the rendering to complete before updating the cart total
  setTimeout(() => {
    updateCartTotal();
  }, 0);
  // Add event listener for the checkout button
  const checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      // Redirect to the checkout page
      window.location.href = "/checkout/index.html";
    });
  }
});
