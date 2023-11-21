// import "dotenv/config";
const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";
async function convertToJson(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
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
    console.log({product: data});
    return data.Result;
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


// To access: product.Result.Images