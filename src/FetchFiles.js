const jsonProducts = require("./utils/products.json");

const jsonDiscounts = require("./utils/discounts.json");

function FetchFiles() {
  function getProducts() {
    return jsonProducts;
  }
  function getDiscounts() {
    return jsonDiscounts;
  }
  return {
    getDiscounts: getDiscounts,
    getProducts: getProducts
  };
}

module.exports = FetchFiles;
