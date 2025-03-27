
import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { Hero } from "./Hero/Banner";
import ProductGrid from "./Products/ProductGrid";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { ThemeContext } from "../../context/Theme/ThemeContext";
const Home = () => {
    const [data, setData] = useState([]);//to store all the products
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState("All");//to make categories button active
    const { theme } = useContext(ThemeContext);
    const [error,setError]=useState(null)//for storing error message

    //fetch all the products and store it data state variable
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setData(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError("Failed to load products. Please try again later.");
            } 
            setLoading(false);
            
        };

        getProducts();

    }, []);
    // Filter products based on category selection
    const filteredProducts = useMemo(() => {
        if (active === "All") return data;
        return data.filter((item) => item.category === active);
    }, [data, active]);

    // Handle category selection
    const handleClick = useCallback((category) => {
        setActive(category);
    }, []);

    return (
        <div>
            <Hero />
            <div className="buttons d-flex flex-row justify-content-center mb-1 pb-5 mt-5 flex-wrap">
                {["All", "men's clothing", "women's clothing", "jewelery", "electronics"].map((category) => (
                    <button
                        key={category}
                        className={`btn me-2 my-1 ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"} ${active === category ? "active" : ""}`}
                        onClick={() => handleClick(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            <hr className={`${theme === "dark" ? "text-light" : "text-secondary-subtle"}`} />
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>) : error ? (
                    <h2 className="text-center fw-semibold text-danger">{error}</h2>):
                //sending filter
                <ProductGrid filterData={filteredProducts} />}
        </div>
    );
};

export default Home;
