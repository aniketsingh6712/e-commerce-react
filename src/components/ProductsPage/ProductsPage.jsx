
import React, { useState, useEffect,useMemo } from "react";
import ProductGrid from "../Home/Products/ProductGrid";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./ProductPage.css"
export const ProductsPage = () => {
    const [data, setData] = useState([]);// to store all products
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");// for search data
    const [category, setCategory] = useState("All");//to store categories
    const [maxPrice, setMaxPrice] = useState(2000);//store price
    const [error,setError]=useState(null)//for storing error message

    //fetching all products
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setData(response.data);
               
            } catch (err) {
                console.log('error', err);
                setError("Failed to load products. Please try again later.");
            }
            setLoading(false);
        };
        getProducts();
    }, []);

    //handling filteration and storing the result in the variable
    const filteredData = useMemo(() => {
        return data.filter(item => 
            (search === "" || item.title.toLowerCase().includes(search.toLowerCase())) &&
            (category === "All" || item.category.toLowerCase() === category.toLowerCase()) &&
            item.price <= parseFloat(maxPrice)
        );
    }, [data, search, category, maxPrice]);

    // Clear all filters
    const clearFilters = () => {
        setSearch("");
        setCategory("All");
        setMaxPrice(2000);
    };

    return (
        <div className="d-flex">
            {/* Sidebar Filter */}
            <div className="p-2 border bg-light text-start mt-5 me-3 filter"  style={{ width: "15vw",height:"fit-content" }}>
                <h5 className="mb-3">Filter Products</h5>
                <div className="mb-4">
                    <input 
                        type="text" 
                        className="form-control " 
                        placeholder="Search products..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <h6 className="mb-2">Category</h6>
                    {['All', "men's clothing", "women's clothing", "jewelery", "electronics"].map(cat => (
                        <div key={cat} className="form-check">
                            <input 
                                type="radio" 
                                className="form-check-input" 
                                name="category" 
                                value={cat} 
                                checked={category === cat} 
                                onChange={() => setCategory(cat)}
                            />
                            <label className="form-check-label">{cat}</label>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label className="form-label">Max Price</label>
                    <input 
                        type="range" 
                        className="form-range" 
                        min={100} 
                        max={2000} 
                        step={100} 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(e.target.value)} 
                    />
                    <p className="text-muted">Up to ₹{maxPrice}</p>
                </div>
                <button className="btn btn-warning w-100" onClick={clearFilters}>Clear Filters</button>
            </div>
            {/* Main Content */}
            <div className="flex-grow-1">
                {loading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Spinner animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <h2 className="text-center fw-semibold text-danger mt-5">{error}</h2>): (
                   filteredData.length===0?<h1 className="text-warning text-center mt-5">No Product Found</h1>:<ProductGrid filterData={filteredData} />
                )}
            </div>
        </div>
    );
};


