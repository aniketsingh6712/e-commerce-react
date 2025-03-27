import React from "react";
import { Card, Button } from "react-bootstrap";
import "./ProductCard.css"; // Custom styles
import { StarFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  
    return (
        <Card className="product-card shadow-sm" style={{ height: "60vh"}}>
            <div className="product-image">
            <Card.Img variant="top" src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
            
            </div>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-muted">Category: {product.category}</Card.Text>
                
                <Card.Text className="fw-bold">₹{product.price.toFixed(2)}</Card.Text>{/*keeping price to two decimal places*/}
                <div className="d-flex align-items-center mb-2">
                   <span>{product.rating.rate}</span>
                    {[...Array(5)].map((_, i) => (
                        <StarFill key={i} className={i < Math.round(product.rating.rate) ? "text-warning" : "text-secondary"} />//if i values less than product rating star will be yellow otherwise it will be gray
                    ))}
                    <span className="ms-2">({product.rating.count})</span>
                </div>
                <NavLink to={`/product/${product.id}`} className="btn btn-warning ms-3 px-4 py-2">
                        Buy Now
                    </NavLink>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
