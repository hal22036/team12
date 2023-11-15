import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
          <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
          </a>
        </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    const filteredTents = this.filterProducts(list, 4);
    this.renderList(filteredTents, 'afterbegin', true);
    document.querySelector(".title").innerHTML = this.category;
  }

  filterProducts (allProducts, numberofTentsNeeded = 4) {

    // console.log({allProducts})
    return allProducts
    // .filter((product) => product.category === "Tent")
    .slice(0, numberofTentsNeeded);
     }

  renderList(list, position = "afterbegin", clearContent = true) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      position,
      clearContent
    );
  }
}