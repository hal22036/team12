import ShoppingCart from "./shoppingcart.mjs";
import { loadHeaderFooter, updateIcon } from "./utils.mjs";

(async () => {
  await loadHeaderFooter();
  updateIcon();
  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
})();

