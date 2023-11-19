// import "dotenv/config";
const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";
async function convertToJson(res) {
  console.log({ok: res.ok})
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
