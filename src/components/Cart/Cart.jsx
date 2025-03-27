//cart

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, DelItem, DelEntireItem } from '../../redux/productslicer';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const Products = useSelector((state) => state.product);
    const User = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //removing the item from redux and local storage
    const deleteItem = (product) => {
        dispatch(DelItem(product));
        let retrieveCartProducts = JSON.parse(localStorage.getItem("cart")) || [];

        // Reduce quantity or remove item if quantity is 1
        const updatedCart = retrieveCartProducts
            .map((cart) => {
                if (cart.UserId === User[0]?.Id && cart.id === product.id) {
                    if (cart.qty > 1) {
                        return { ...cart, qty: cart.qty - 1 }; // Reduce quantity
                    }
                    return null; // Mark item for removal
                }
                return cart;
            })
            .filter((cart) => cart !== null); // Remove items with qty = 0

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    //adding item to updating item in redux and local storage
    const addItem = (product) => {

        dispatch(AddItem(product));
        let retrieveCartProducts = JSON.parse(localStorage.getItem("cart")) || [];
        const UpdatedCart = retrieveCartProducts.map((cart) => {
            if (cart.UserId === User[0]?.Id && cart.id === product.id) {
                cart.qty += 1;
            }
            return cart;
        })
        localStorage.setItem("cart", JSON.stringify(UpdatedCart));

    };
    //deleting item in cart and localstorage
    const DeleteCartData = (product) => {
        dispatch(DelEntireItem(product));
        let retrieveCartProducts = JSON.parse(localStorage.getItem("cart")) || [];
        let updatedCart = retrieveCartProducts.filter((cart) => {
            return !(cart.UserId === User[0].Id && cart.id === product.id);
        });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    //total price of items
    const totalPrice = Products.reduce((acc, product) => acc + product.qty * product.price, 0);

    //cart ui
    const ShowCart = () => {

        return Products.map((product) => {


            return (
                <div className="card mb-3 p-3 shadow-sm border-0 rounded" key={product.id}>
                    <div className="d-flex flex-row justify-content-between align-items-start flex-wrap">
                        <div className="col-md-3 d-flex justify-content-center align-items-center">
                            <img src={product.image} alt={product.title} className="img-fluid rounded" style={{ maxWidth: '150px' }} />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 px-3">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title fw-bold">{product.title}</h5>

                            </div>
                            <p className="text-muted">Rating: {product.rating?.rate} ★ ({product.rating?.count} reviews)</p>

                            <p className="fw-bold">Total: ₹{(product.qty * product.price).toFixed(2)}</p>
                            <div className="d-flex justify-content-center  mt-3 align-items-center px-4 mb-2" style={{ border: "3px solid #ffd814", borderRadius: "1.5em", width: "fit-content", height: "5vh", fontSize: "0.6em" }} >
                                <button className="btn fw-semibold fs-4 " style={{ border: "none" }} onClick={() => addItem(product)}>+</button>
                                <span className="mx-2 fw-bold fs-3">{product.qty}</span>
                                <button className="btn fw-semibold fs-4 " style={{ border: "none" }} onClick={() => deleteItem(product)}>-</button>

                            </div>

                        </div>
                        <div>
                            <h6 className="fw-bold text-end">Price: ${product.price.toFixed(2)}</h6>
                            <button className="btn fw-semibold text-warning fs-4 mt-3" style={{ border: "none" }} onClick={() => DeleteCartData(product)}><i class="fa fa-solid fa-trash"></i></button>
                        </div>

                    </div>
                </div>
            )
        });
    };
    //empty cart ui
    const EmptyCart = () => (
        <div className="text-center py-5 text-warning">
            <h2>Your Cart is Empty</h2>
            <p className="text-secondary">Add some products to your cart to proceed.</p>
        </div>
    );
    //checkout button
    const CheckoutButton = () => (
        <div className="card p-3 shadow-sm border-0 rounded" style={{ maxWidth: '450px', margin: 'auto', height: "fit-content" }}>
            <h5 className="text-center mb-3">Subtotal ({Products.length} items): <span className="fw-bold">${totalPrice.toFixed(2)}</span></h5>
            <button style={{ width: "fit-content", margin: "0px auto", fontSize: "0.9rem" }} className="btn btn-warning btn-sm rounded-pill" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
            </button>
        </div>
    );

    return (
        <div className="container py-5" style={{minHeight:"62vh"}}>
            <h2 className="fw-bold mb-4 text-warning">Shopping Cart</h2>
            {Products.length > 0 ? (
                <>
                    <ShowCart />
                    <CheckoutButton />
                </>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
}
