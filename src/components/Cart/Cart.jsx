import React from "react";
import "./Cart.css";
// const Cart = (props) => {
    // const cart = props.cart; //option 1 for using cart in other component
    // const {cart} = props; //option 2
    const Cart = ({cart}) => { //option 3

console.log(cart)
 
let total = 0;
for (const product of cart){
    total = total + product.price;

}

  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${total} </p>
      <p>Shipping: </p>
      <p>Tax: </p>
      <h6>Grand Total: </h6>
    </div>
  );
};

export default Cart;
