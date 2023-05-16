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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  // }

  const pageNumbers = [...Array(totalPages).keys()];

  console.log(totalProducts);
  /**
   * Done: 1. Determine the total number of items:
   * TODO: 2. Decide on the number of items per page:
   * DONE: 3. Calculate the total number of pages:
   * DONE: 4. Determine the current page
   */

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );

      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    // console.log("products", products);
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step 1 : get id of the storedCart
        for (const id in storedCart) {
          // step :2 get product from products state by using id
          const addedProduct = cartProducts.find((product) => product._id === id);
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
      });
  }, []);

  const handleAddToCart = (product) => {
    // cart.push(product);
    // const newCart = [...cart, product];

    // *hard technique of ( Cart.jsx :17)
    // if product doesn't exist in the cart , then set quantity = 1, if exist update quantity by 1
    let newCart = [];
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    //! add cart data to LocalStorage (51-4)
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  return (
    <>
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
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="btn-proceed">
                Review Order
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        <p>
          Current Page: {currentPage} <br />
          Items Per Page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
