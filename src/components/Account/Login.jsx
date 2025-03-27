import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddUser } from '../../redux/userslicer';
import { AddItem } from '../../redux/productslicer';
import axios from 'axios';
import { ThemeContext } from '../../context/Theme/ThemeContext';
function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);
  //to handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];//fetching all the accounts from local storage
    const accountsArray = Array.isArray(storedAccounts) ? storedAccounts : [storedAccounts];
    const myAccount = accountsArray.find(c => c.email === credentials.email && c.password === credentials.password);//checking credentials

    if (myAccount) {
      dispatch(AddUser(myAccount));//adding user to redux store

      //fetching cart data of user
      let retrieveCartProducts = JSON.parse(localStorage.getItem("cart")) || [];
      const fetchCartItems = async () => {
        for (const cart of retrieveCartProducts) {
          if (cart.UserId === myAccount.Id) {
            try {
              const response = await axios.get(`https://fakestoreapi.com/products/${cart.id}`);
              for (let i = 0; i < cart.qty; i++) {
                //adding cart items to redux store
                dispatch(AddItem(response.data));
              }
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          }
        }
        nav("/home");//navigating to home
      };

      await fetchCartItems();
      nav("/home");//navigating to home
    } else {
      setMessage("Credentials do not match");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5" style={{ minHeight: "62vh" }}>

      <div className="text-center mb-4 ">
        <NavLink to="/home" className="text-decoration-none">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"

            alt="Amazon Logo"
            style={{ width: "100px", filter: `${theme === "light" ? "invert(0%)" : "invert(30%)"}` }}
          />
          <span className={`fs-5 ${theme === "light" ? "text-black" : "text-white"}`}> .in</span>
        </NavLink>
      </div>

      <div className="card p-4" style={{ width: "350px" }}>


        <h3 className="text-start fw-semibold">Sign In</h3>
        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}

              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 rounded-pill">
            Login
          </button>
        </form>
        <div className="d-flex align-items-center mt-2" style={{ fontSize: "13px", marginLeft: "9%" }}>
          <h6 className="mb-0">Don't have an account??</h6>
          <NavLink to="/register" className="ms-2 fw-semibold text-decoration-none">Sign up&gt;</NavLink>
        </div>

        {message && <p className="mt-4 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
}

export default Login