import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  // updateIcon();
  const category = getParams("category");
  const productDataInstance = new productData();
  const element = document.querySelector(".product-list");
  const productList = new ProductListing(
    category,
    productDataInstance,
    element
  );
  productList.init();
  // new Alert();
})();
