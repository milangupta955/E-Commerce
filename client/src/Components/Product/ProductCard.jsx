import React from 'react'
import './ProductCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { addToCart } from '../../Redux/actionHandlers';
import { Link } from 'react-router-dom';
function ProductCard(params) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const cart = useSelector(state => state.cart.cart);
    const addProductToCart = () => {
        const pid = params.pid;
        const pname = params.name;
        const productPic = params.pic;
        const quantity = 1;
        const price = params.price;
        if(cart.find(prod => prod.productId === pid)) {
            window.alert('Product Already in Cart');
            return;
        }
        if (isLoggedIn) {
            dispatch(addToCart(quantity, pname, productPic, pid,price));
            window.alert('Product Added SuccessFully');
        } else {
            window.alert('You Must login First');
            return <Navigate to='/login'></Navigate>
        }
    }
    const link = `/product/${params.pid}`;
    return (
        <div class="card max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-3">
            <div class="px-4 py-2 header">
                <Link to = {link}><h1 class="text-gray-900 font-bold text-3xl uppercase">{params.name}</h1></Link>
                <p class="text-gray-600 text-sm mt-1">{params.desc}</p>
            </div>
            <img class="itemPic" src={params.pic} alt="product"/>
            <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 class="text-gray-200 font-bold text-xl">Rs {params.price}</h1>
                <button class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded" pid={params.pid} onClick={addProductToCart}>Add to cart</button>
            </div>
        </div>
    )
}

export default ProductCard