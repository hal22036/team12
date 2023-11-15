import { loadHeaderFooter, updateIcon } from "./utils.mjs";
// import Alert from "./Alert";

(async () => {
  await loadHeaderFooter();
  updateIcon();
})();

// new Alert();
