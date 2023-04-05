import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// const Cart = (props) => {
    // const cart = props.cart; //option 1 for using cart in other component
    // const {cart} = props; //option 2
    const Cart = ({cart,handleClearCart}) => { //option 3

// console.log(cart)
 
let totalPrice = 0;
let totalShipping = 0;
let quantity = 0;


for (const product of cart){

  //! technique for selected quantity get 0,after reload but stored in localStorage
  // * easy technique
  /* if(product.quantity === 0){
    product.quantity = 1
  } */
  //* shortcut technique
  // product.quantity = product.quantity || 1;

    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping * product.quantity;
    quantity = quantity + product.quantity;

}
const tax = totalPrice*7/100;
const grandTotal = totalPrice + totalShipping + tax;


  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice} </p>
      <p>Shipping: {totalShipping}</p>
      <p>Tax: ${tax}</p>
      <h6>Grand Total: ${grandTotal}</h6>
      <button onClick={handleClearCart} className="btn-clear-cart">
        <span >Clear Cart</span>
      <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default Cart;
