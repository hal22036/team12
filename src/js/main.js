import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  updateIcon();
  const productDataInstance = new productData("tents");
  const element = document.querySelector(".product-list");
  const productList = new ProductListing("Tents", productDataInstance, element);
  productList.init();
})();

// new Alert();
