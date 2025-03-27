import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
function OrderCard({ product }) {
  const nav = useNavigate();
  return (
    <Card className="d-flex flex-row p-3 border-0 align-items-center" style={{ width: "60vw" }}>

      {/*---------product image */}
      <div className="me-2">
        <Card.Img src={product.image} alt={product.title} className="img-fluid"
          style={{ maxWidth: "150px", minWidth: "80px", height: "auto", objectFit: "cover" }}
        />
      </div>

      {/**-------------product data */}
      <div className='ps-3'>
        <Card.Title>{product.title}</Card.Title>
        <div className="d-flex align-items-center">
          {product.rating.rate}
          <span className="ms-2">({product.rating.count})</span>
        </div>
        <Card.Text className="text-muted">Category: {product.category}</Card.Text>
        <Card.Text className="fw-bold">Price: ₹{product.price}</Card.Text>
        <Card.Text>Quantity:{product.qty}</Card.Text>
        
        <Button variant="warning" style={{ width: "fit-content", fontSize: "0.8em" }} onClick={() => nav(`/product/${product.id}`)}>View your item</Button>
      </div>
    </Card>
  )
}

export default OrderCard