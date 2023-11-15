import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";


(async () => {
  await loadHeaderFooter();  
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
  updateIcon();
})();