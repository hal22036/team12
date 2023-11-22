// import "dotenv/config";
const baseURL = "https://wdd330-backend.onrender.com/";
async function convertToJson(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw { name: "servicesError", message: data };
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
    //console.log({product: data});
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

      const checkoutReturn = await fetch(baseURL + "checkout/", options);
      if (checkoutReturn.status === 400) {
        const errorData = await checkoutReturn.json();
        console.log({errorData})
        const errorMessages = Object.keys(errorData).map((key) => {
          return {
            message: errorData[key]
          }

        });
        throw {
          data: errorMessages,
          error: new Error()
        }
      }
      return checkoutReturn;
      // const response = await fetch(baseURL + "checkout/", options);
      // const data = await convertToJson(response);
  
      // if (response.ok) {
      //   return data;
      // } else {
      //   console.error(`Error during checkout. Server responded with status ${response.status}.`);
      //   throw new Error("Bad Response");
      // }
    } catch (error) {
      // console.log({messages: JSON.parse(error.message)});
      console.error('Error during checkout:', error);
      throw {
        data: error.data,
        error: new Error()
      };
    }
  }
}

  



