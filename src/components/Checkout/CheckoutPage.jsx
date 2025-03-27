import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClearItem } from '../../redux/productslicer';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import { ThemeContext } from '../../context/Theme/ThemeContext';
import "./Checkout.css"
function Checkout() {
    const products = useSelector((state) => state.product);
    const User = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nav = useNavigate();//for navigation
    const [houseAddress, setHouseAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [note, setNote] = useState("");
    const [giftcode,setGiftCode]=useState("");
    const [errors, setErrors] = useState({});//to store error messages
    const [showModal, setShowModal] = useState(false);//for address form
    const {theme}=useContext(ThemeContext);
    // Calculate booking and delivery dates
    const bookingDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(bookingDate.getDate() + 7);

    const handleClose=()=>setShowModal(false)//closing address form

    //validating address form
    const validateForm = () => {
        let newErrors = {};
        if (houseAddress.trim().length < 6) {
            newErrors.houseAddress = "House address must be at least 6 characters long.";
        }
        if (!city.trim()) {
            newErrors.city = "City cannot be empty.";
        }
        if (!state.trim()) {
            newErrors.state = "State cannot be empty.";
        }
        if (!/^[0-9]{6}$/.test(pincode)) {
            newErrors.pincode = "Pincode must be exactly 6 digits.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //handling address form and closing it after validating
    const submitAddress=()=>{
        if (validateForm()){
            setShowModal(false);
        }
        
    }

    //handling checkout
    const handleCheckout = () => {
        if(!validateForm()){                          //checking if address form is filled
            alert("address must be filled Correctly");
            return;
        }
        else if(!paymentMethod.trim()){             //checking if payment option is filled
            alert("Please choose a Payment Method");
            return;
        }
        let orders = JSON.parse(localStorage.getItem("orders")) || [];//fetching orders from local storage
        const newOrder = {
            userId: User[0]?.Id,
            items: products,
            userinfo: { name: User[0].name, phone: User[0].phone },
            address: `${houseAddress}, ${city}, ${state} - ${pincode}`,
            totalPrice: totalPrice,
            note: note,
            bookingDate: bookingDate.toLocaleDateString(),
            deliveryDate: deliveryDate.toLocaleDateString(),
        };
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));//adding order

        let cart = JSON.parse(localStorage.getItem("cart")) || [];//fetching cart data
        const updatedCart = cart.filter(
            (cartItem) => !products.some(
                (orderedItem) =>
                    cartItem.UserId === User[0]?.Id &&
                    cartItem.id === orderedItem.id
            )
        );//filtering cart data to remove order
        localStorage.setItem("cart", JSON.stringify(updatedCart));//updating cart data in local storage
        dispatch(ClearItem()); //clearing items in redux store
        alert("Your order has been placed successfully!");
        nav('/home');//navigating to home
    };

    //total price
    const totalPrice = products.reduce((acc, product) => acc + product.qty * product.price, 0);

    return (
        <div>
            <h3 className={`fw-bold fs-medium ms-5 mt-5 ${theme==="dark"?"text-warning":""}`}>Review your order</h3>
            <div className="d-flex flex-row flex-wrap main_container">
                {/***----------------------address section and products section------------------*/}
                <div className='d-flex flex-column justify-content-center align-items-center mx-2'>
                    {/*--------------address,payment and gift code section */}
                    <div className='container mx-2 d-flex flex-row justify-content-between border px-5 py-5 bg-white flex-wrap' style={{ width: "60vw" }}>
                        <div >
                            <h5 className='fw-semibold'>Shipping address</h5>
                            {houseAddress && <p>{houseAddress},<br />{city}, {state} <br />{pincode}</p>}
                            {houseAddress && <p>Phone:{User[0].phone}</p>}
                            {!houseAddress?<button type="button" className="btn btn-info mt-2" onClick={()=>setShowModal(true)}>Add address</button>:<button type="button" className="btn btn-info mt-2" onClick={()=>setShowModal(true)}>Change address</button>}
                        </div>
                        <div >
                            <h5 className='fw-semibold'>Payment method</h5>
                            <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="form-select" >
                                <option selected>Choose Payment method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                              
                            </select>
                        </div>
                        <div className='gift_code'>
                            <h5 className='fw-semibold'>Gift cards & promotion codes</h5>
                            <div className='input-group'>
                            <input type="text" value={giftcode} onChange={(e)=>setGiftCode(e.target.value)} className="form-control" placeholder="Enter Code"/>
                            <button type="button" className="btn btn-secondary">Apply</button>
                            </div>
                        </div>

                    </div>
                    {/**--------------------------product details section */}
                    <div className='container my-3 mx-2 border p-3 bg-white' style={{width:"60vw"}}>
                        <h5 className='text-warning fw-bold'>Estimated Delivery:{deliveryDate.toDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</h5>
                    {products.map((product) => (
                        <div key={product.id} className="mb-3 p-3">
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <img src={product.image} alt={product.title} height="150px" width="150px" />
                                </div>
                                <div className="col-md-8">
                                    <h5 className='fw-bold'>{product.title}</h5>
                                    <h6>Price: ${product.price.toFixed(2)}</h6>
                                    <h6><b>Quantity:</b> {product.qty}</h6>
                                    <h6><b>Total:</b> ${(product.qty * product.price).toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    </div>
                </div>
                {/*****-----------------------------place order section with order summary */}
                <div className='container border p-3 bg-white mb-3' style={{width:"fit-content",height:"fit-content"}}>
            
                    <Button variant="warning" className="w-100 mb-3" onClick={handleCheckout}>Place Order</Button>
                    <div>
                        <h5 className='fw-semibold'>Order Summary</h5>
                        <p>Items: ${totalPrice}</p>
                        <p>Shipping and Handling: $10</p>
                        <p>Free Shipping: -$6</p>
                        <hr/>
                        <p style={{ color: "red", fontWeight: "bold" }}>Order Total: ${totalPrice+10-6}</p>
                    </div>
                
                </div>

            </div>
             {/*-------------------------------------address form--------------------------- */}
            <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>House Address</Form.Label>
                        <Form.Control type="text" value={houseAddress} onChange={(e) => setHouseAddress(e.target.value)} isInvalid={!!errors.houseAddress} placeholder="Enter house address" />
                        <Form.Control.Feedback type="invalid">{errors.houseAddress}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} isInvalid={!!errors.city} placeholder="Enter city" />
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} isInvalid={!!errors.state} placeholder="Enter state" />
                        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} isInvalid={!!errors.pincode} placeholder="Enter pincode" maxLength="6" />
                        <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Add a Note (Optional)</Form.Label>
                        <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any special instructions?" />
                    </Form.Group>
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="warning" onClick={submitAddress}>Place Order</Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default Checkout;