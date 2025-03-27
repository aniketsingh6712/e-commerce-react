//for individual product pages
import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../../redux/productslicer"
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../../context/Theme/ThemeContext";
export default function Product() {

    const [product, setProduct] = useState(null);
    const { id } = useParams();//to get product data
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(null);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const User = useSelector((state) => state.user)//user data from redux
    //fetching product data
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product: ", error);
                setError("Failed to load product. Please try again later.");
            }
            setLoading(false);
        };
        getProduct();
    }, [id]);

    //adding to cart and local storage
    const addItem = (product) => {
        if(!User[0]){
            alert("Login to add Products to cart");
            return;
        }
        const UpdatedProduct = { UserId: User[0]?.Id, qty: 1, ...product }
        dispatch(AddItem(product));
        //fetching cart data from local storage
        let retrieveCartProducts = JSON.parse(localStorage.getItem("cart")) || [];
        let productExists = false;

        // If cart is empty, add the product directly
        if (retrieveCartProducts.length === 0) {
            localStorage.setItem("cart", JSON.stringify([UpdatedProduct]));
        } else {
            // Update quantity if product exists
            const updatedCart = retrieveCartProducts.map((cart) => {
                if (cart.UserId === User[0]?.Id && cart.id === product.id) {
                    cart.qty += 1;
                    productExists = true; // Product is found
                }
                return cart;
            });

            if (productExists) {
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart
            } else {
                // Add new product to cart
                localStorage.setItem("cart", JSON.stringify([...updatedCart, UpdatedProduct]));
            }
        }

    };
    //for loading
    if (loading) {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <Skeleton height={400} />
                    </div>
                    <div className="col-md-6">
                        <Skeleton height={50} width={300} />
                        <Skeleton height={75} />
                        <Skeleton height={20} count={3} />
                        <Skeleton height={40} width={150} />
                    </div>
                </div>
            </div>
        );
    }
    if(error){
        return(
            <div style={{height:"60vh"}}> <h2 className="text-center fw-semibold text-danger mt-5">{error}</h2></div>
           
        )
    }
    //if poduct does not exist
    if (!product) return <p className="text-center py-5">Product not found</p>;

    return (
        <div className="container py-5">
            
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <img src={product.image} alt={product.title} className="img-fluid rounded" style={{ maxWidth: "400px" }} />
                </div>
                <div className="col-md-6">
                    <h5 className={` text-uppercase ${theme === "dark" ? "text-white-50" : "text-muted"}`}>{product.category}</h5>
                    <h1 className={`display-6 fw-bold ${theme === "dark" ? "text-white-50" : ""}`}>{product.title}</h1>
                    <p className="text-warning fw-bold">Rating: {product.rating.rate} ★ ({product.rating.count} reviews)</p>
                    <h3 className="text-danger fw-bold">₹{product.price}</h3>
                    <p className={` ${theme === "dark" ? "text-secondary" : ""}`}>{product.description}</p>
                    <button className={`btn  px-4 py-2  ${theme === "dark" ? "btn-outline-warning" : "btn-outline-dark"}`} onClick={() => addItem(product)}>
                        Add to Cart
                    </button>
                    <NavLink to="/cart" className="btn btn-dark ms-3 px-4 py-2">
                        Go to Cart
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
