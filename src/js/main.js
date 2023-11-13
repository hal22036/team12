import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
// import Alert from "./Alert";

loadHeaderFooter();
const productDataInstance = new productData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductListing("Tents", productDataInstance, element);
productList.init();

// new Alert();

// updateIcon();
