import React from "react";
import "./Cart.css";
// const Cart = (props) => {
    // const cart = props.cart; //option 1 for using cart in other component
    // const {cart} = props; //option 2
    const Cart = ({cart}) => { //option 3

console.log(cart)
 
let totalPrice = 0;
let totalShipping = 0;

for (const product of cart){
    totalPrice = totalPrice + product.price;
    totalShipping = totalShipping + product.shipping;
}
const tax = totalPrice*7/100;
const grandTotal = totalPrice + totalShipping + tax;


  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice} </p>
      <p>Shipping: {totalShipping}</p>
      <p>Tax: ${tax}</p>
      <h6>Grand Total: ${grandTotal}</h6>
    </div>
  );
};

export default Cart;
