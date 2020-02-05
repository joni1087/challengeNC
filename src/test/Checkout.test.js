const Checkout = require("../Checkout");

test("Carrito Vacio - OK", () => {
  const check = new Checkout();
  expect(check.getTotal()).toBe(0);
});

test("Carrito con productos SinDescuento - OK", () => {
  const check = new Checkout();
  check.addItem("TSHIRT");
  check.addItem("VOUCHER");
  check.addItem("MUG");
  expect(check.getTotal()).toBe(32.5);
});

test("Carrito con productos 2X1 - OK", () => {
  const check = new Checkout();
  check.addItem("MUG"); //7.5
  check.addItem("VOUCHER"); //5
  check.addItem("VOUCHER"); //5
  expect(check.getTotal()).toBe(12.5);
});

test("Carrito con productos Bulk - OK", () => {
  const check = new Checkout();
  check.addItem("TSHIRT");
  check.addItem("VOUCHER");
  check.addItem("TSHIRT");
  check.addItem("TSHIRT");
  expect(check.getTotal()).toBe(62);
});

test("Carrito con productos Mix - OK", () => {
  const check = new Checkout();
  check.addItem("TSHIRT");
  check.addItem("VOUCHER");
  check.addItem("TSHIRT");
  check.addItem("TSHIRT");
  check.addItem("MUG");
  check.addItem("VOUCHER");
  expect(check.getTotal()).toBe(69.5);
});
