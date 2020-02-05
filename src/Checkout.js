//Principal de la aplicación

const FetchFiles = require("./FetchFiles.js");

const CONSTANTS = require("./utils/Constant.js");

function CheckOut() {
  const fech = new FetchFiles();
  const jsonDiscounts = fech.getDiscounts();
  const jsonProducts = fech.getProducts();

  const cart = {};

  function addItem(code) {
    if (!cart[code]) {
      cart[code] = { cod: code, count: 0, discountAmount: 0, netAmount: 0 };
    }
    cart[code].count++;
  }

  function getTotal() {
    let itemAmount,
      totalAmount = 0;
    for (let item in cart) {
      getPrice(cart[item]);
      applyDiscount(cart[item]);
      totalAmount = totalAmount + cart[item].netAmount;
    }
    return totalAmount;
  }

  function getPrice(item) {
    let { price } = jsonProducts.products.find(prod => prod.code == item.cod);
    item.price = price;
  }

  // aplicar descuentos a los Items
  function applyDiscount(item) {
    jsonDiscounts.discounts.forEach(discount => {
      if (discount.active) {
        if (discount.products.find(product => product == item.cod)) {
          getDiscount(item, discount);
        }
      }
    });
    item.netAmount = item.count * item.price - item.discountAmount;
  }

  //Obtiene los descuentos segun el tipo y cantidad minima necesaria
  function getDiscount(item, discount) {
    if (item.count >= discount.minProduct) {
      if (discount.type == CONSTANTS.PRICE_RULE_TYPE_BULK) {
        item.discountAmount = item.discountAmount + item.count * discount.mount;
      }
      if (discount.type == CONSTANTS.PRICE_RULE_TYPE_UNIT) {
        let mount = item.count % discount.minProduct;
        if (mount == 0) {
          item.discountAmount = item.price;
        } else {
          item.discountAmount = item.price * mount;
        }
      }
    }
  }

  return {
    addItem: addItem,
    getTotal: getTotal
  };
}

module.exports = CheckOut;
