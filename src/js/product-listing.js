import productData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  const category = getParams("category");
  // first create an instance of our ProductData class.
  const productDataInstance = new productData();
  // then get the element we want the product list to render in
  const element = document.querySelector(".product-list");
  // then create an instance of our ProductList class and send it the correct information.
  const productList = new ProductListing(
    category,
    productDataInstance,
    element
  );
  // finally call the init method to show our products
  productList.init();
  // new Alert();
  updateIcon();
})();
