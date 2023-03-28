import React from 'react';
import './Product.css'

const Product = (props) => {
    const {img, name, price, seller, quantity, ratings} = props.product;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='prodcut-info'>
            <h6 className='product-name'>{name}</h6>
            <p>Price: ${price}</p>
            <p>Manufacturer: {seller}</p>
            <p>Ratings: {ratings} Star</p>
            </div>
            <button className='btn-cart'>Add to Cart</button>
        </div>
    );
};

export default Product;