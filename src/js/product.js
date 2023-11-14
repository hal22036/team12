import ProductData from "./ProductData.mjs";
import { getParams, loadHeaderFooter, updateIcon } from "./utils.mjs";
import productDetails from "./ProductDetails.mjs";

(async () => {
  await loadHeaderFooter();
  updateIcon();
  const dataSource = new ProductData("tents");
  const productId = getParams("product");
  const product = new productDetails(productId, dataSource);
  product.init();
})();
