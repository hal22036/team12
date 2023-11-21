// import "dotenv/config";
const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";
async function convertToJson(res) {
  console.log({ok: res.ok})
  if (res.ok) {
    return await res.json();
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    // console.log({category})
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    // const response = await fetch(`http://server-nodejs.cit.byui.edu:3000/products/search/${category}`);
    const data = await convertToJson(response);
    // console.log({data})
    return data.Result;
    // return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    // const response = await fetch(`http://server-nodejs.cit.byui.edu:3000/product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    console.log("Checkout Payload:", payload); // Log the payload
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
  
      const response = await fetch(baseURL + "checkout/", options);
      const data = await convertToJson(response);
  
      if (response.ok) {
        return data;
      } else {
        console.error(`Error during checkout. Server responded with status ${response.status}.`);
        throw new Error("Bad Response");
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      throw new Error("Bad Response");
    }
  }
  
}
