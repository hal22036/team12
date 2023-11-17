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
})();
