import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();




  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    // console.log("products", products);
    const storedCart = getShoppingCart();
    const savedCart = [];

// step 1 : get id of the storedCart
    for (const id in storedCart) {
// step :2 get product from products state by using id
      const addedProduct = products.find((product) => product._id === id);
      if (addedProduct) {
//   step : 3 get quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
// step : 4 add the addedProduct to the savedCart
        savedCart.push(addedProduct);
        console.log(addedProduct);
      }
      // console.log("added prod", addedProduct);
    }
// step : 5 set the cart
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // cart.push(product);
    // const newCart = [...cart, product];

// *hard technique of ( Cart.jsx :17)
    // if product doesn't exist in the cart , then set quantity = 1, if exist update quantity by 1
    let newCart = [];
    const exists = cart.find(pd => pd._id === product._id);
    if (!exists){
      product.quantity = 1 ;
      newCart = [...cart, product]
    }
    else{
      exists.quantity = exists.quantity +1 ;
      const remaining = cart.filter(pd => pd._id !== product._id);
      newCart = [...remaining, exists]
    }

    setCart(newCart);
//! add cart data to LocalStorage (51-4)
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([])
    deleteShoppingCart();
  }


  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart 
        cart={cart}
        handleClearCart= {handleClearCart}
        >
          <Link className="proceed-link" to="/orders">
            <button className="btn-proceed">
              Review Order
              <FontAwesomeIcon icon={faArrowRight} />
              </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
