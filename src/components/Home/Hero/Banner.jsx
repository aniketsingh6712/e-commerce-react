import React from 'react'
import "./Banner.css"; 
import {useNavigate } from 'react-router-dom';
export const Hero = () => {
    const nav=useNavigate();
    return (
        <div className="banner text-center d-flex align-items-center justify-content-center">
            <div>
                <h1 className='fw-bold fs-large'>Welcome to Amazon Store</h1>
                <p className='fw-bold fs-medium' >Discover amazing products at unbeatable prices</p>
                <button className="btn btn-warning" onClick={()=>nav("/products")}>Shop Now</button>
            </div>
        </div>
    );
}
