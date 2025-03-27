
import React, { useContext, useState } from 'react'
import './NavBar.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { RemoveUser } from '../../redux/userslicer';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../context/Theme/ThemeContext';
export const NavBar = () => {
  const Products = useSelector((state) => state.product);
  const User = useSelector((state) => state.user);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const nav = useNavigate();
  const dispatch = useDispatch();

  //handle logout
  const logout = () => {
    try {
      dispatch(RemoveUser(User));
      nav('/');
    }
    catch (err) {
      console.error(err);
    }
  }

  const [top, setTop] = useState("navbar")
  //handle navbar in mobile view
  function myFunction() {
    if (top === "navbar") {
      setTop("navbar responsive");

    } else {
      setTop("navbar")

    }
  }


  return (

    <div className={top}>   {/*-----setting classname=top for media queries*/}
      <div className="work">
        <NavLink to="/home" className="text-decoration-none">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            style={{ width: "80px", filter: "invert(30%)" }}
          />

          <span className='fs-5 text-white'> .in</span>
        </NavLink>

        <a href="#" className="btn btn-outline-dark" style={{ textDecoration: "none", border: 'none' }}><span className="icon" style={{ fontSize: "24px", cursor: "pointer", marginRight: '20px', color: "white", padding: '2px' }} onClick={myFunction}>&#9776;</span></a>
      </div>
      <div className="sub-navbar">

        <ul >
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">Products</NavLink>
          </li>
          <li clNavLinkssName="nav-item">
            <NavLink className="nav-link" to="/orders">Orders</NavLink>
          </li>

        </ul>
        <div className='btn border-0' >
          {/* login button */}
          {!(User?.length > 0) && <NavLink to="/" className="btn btn-dark"><i className="fa fa-sign-in me-1"></i>Login</NavLink>}
          {/* cart button and will be display only if user is logged in */}
          {(User?.length > 0) && <NavLink to="/cart" className="btn btn-dark ms-2"><i className="fa fa-shopping-cart me-1" ></i>{Products.length}</NavLink>}
           {/* logout button and will be display only if user is logged in */}
          {User?.length > 0 && <button to="#" className="btn btn-dark ms-2" onClick={logout}><i class="fa fa-solid fa-right-from-bracket me-1"></i>Logout</button>}
          
           {/* Theme changing buttton */}
          <button onClick={toggleTheme} className={`btn ms-2 ${theme === "light" ? "btn-dark" : "btn-light"}`}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </div>
  )
}
