import { updateIcon, loadHeaderFooter } from "./utils.mjs";
(async () => {
  await loadHeaderFooter();
  updateIcon();
})();
