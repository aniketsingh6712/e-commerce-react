import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import OrderCard from './OrderCard';
import { Card, Row, Col } from "react-bootstrap";

function Order() {
    const User = useSelector((state) => state.user);//user data

    const [orders, setOrders] = useState([]);

    //fetching all the order of user
    useEffect(() => {
        if (User && User.length > 0) {
            let retrieveOrders = JSON.parse(localStorage.getItem("orders")) || [];

            let userOrders = retrieveOrders.filter(order => order.userId === User[0].Id);
            setOrders(userOrders);
        }
    }, []);


    return (
        <div style={{ minHeight: "60vh", minWidth: "fit-content" }}>
            {orders.length === 0 ? <h2 className="text-center text-danger mt-5">No Orders Present</h2> :
                (orders.map((order) => (

                    <Card key={order.UserId} className="my-3 mx-3 shadow-sm">
                        <Card.Header className="bg-light text-dark">
                            {/**--------row 1 displaying booking data,total price,name,phone number */}
                            <Row className="g-3 text-md-center text-sm-start">
                                <Col xs={12} md={3}>
                                    <h5>ORDER PLACED</h5>
                                    <p>{order.bookingDate}</p>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h5>TOTAL</h5>
                                    <p>${order.totalPrice}</p>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h5>Name</h5>
                                    <p>{order.userinfo.name}</p>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h5>Contact</h5>
                                    <p>{order.userinfo.phone}</p>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body className="bg-white px-3">
                            {/**---------------delivery date */}
                            <h5 className="text-warning fw-bold text-start">DELIVERY DATE: {order.deliveryDate}</h5>


                            <Row className="justify-content-center px-2">
                                {/**------------ordered product data ,address and Additional notes */}
                                <Col xs={12} lg={8}>
                                    {order.items.map((item) => (
                                        <OrderCard product={item} key={item.id} />
                                    ))}
                                </Col>
                                <Col xs={12} lg={4} className="text-center mt-3 mt-lg-0">
                                    <Card className="p-3 mb-3">
                                        <h6 className='fw-semibold'>Shipping Address:</h6>
                                        <p>{order.address}</p>
                                    </Card>
                                    <Card className="p-3">
                                        <h6 className='fw-semibold'>Additional Note:</h6>
                                        {order.note ? <p>{order.note}</p> : <p>No Notes</p>}
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                )))
            }
        </div>
    )
}

export default Order