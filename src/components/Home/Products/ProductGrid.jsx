//grid of all products
import React, {useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { ThemeContext } from "../../../context/Theme/ThemeContext";

const ProductGrid = ({filterData}) => {
    const {theme}=useContext(ThemeContext)//for theme
    return (
        <Container className="mt-5">
            <h2 className={`text-center mb-4 ${theme === "dark" ? "text-warning" : "text-black"}`}>Featured Products</h2>
            <Row>
                {filterData.map((product) => (
                    <Col key={product.id}lg={3} md={4} sm={6} xs={12} className="mb-4">
                        <ProductCard product={product} /> {/*Sending each product data*/}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductGrid;
