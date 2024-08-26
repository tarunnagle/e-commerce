const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const calcPrices = (orderItems) => {
  const itemPrice = orderItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );

  const shippingPrice = itemPrice > 100 ? 0 : 40;
  const taxPrice = 0.28 * itemPrice;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: addDecimals(itemPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
};
