import ShoppingCart from "./shoppingcart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();

// updateIcon();
