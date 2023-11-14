import ShoppingCart from "./shoppingcart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

(async () => {
  await loadHeaderFooter();
})();
const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

// updateIcon();
