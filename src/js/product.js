import ExternalServices from "./ExternalServices.mjs";
import { getParams, loadHeaderFooter, updateIcon } from "./utils.mjs";
import productDetails from "./ProductDetails.mjs";

(async () => {
  await loadHeaderFooter();
  const dataSource = new ExternalServices("tents");
  const productId = getParams("product");
  const product = new productDetails(productId, dataSource);
  product.init();
  updateIcon();
})();
