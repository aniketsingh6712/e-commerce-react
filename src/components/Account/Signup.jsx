import React, { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';// to unique id's 
import { ThemeContext } from '../../context/Theme/ThemeContext';// for theme

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  })
  const nav = useNavigate();// for navigation
  const { theme } = useContext(ThemeContext);
  const [errors, setErrors] = useState({});
  //handle changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  //form data validation
  const validate = () => {
    let tempErrors = {};
    if (data.name.length < 3) tempErrors.name = "Username must be atleast 3 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) tempErrors.email = "Invalid email format";
    if (data.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(data.password)) {
      tempErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }


    if (!/^[0-9]{10}$/.test(data.phone)) tempErrors.phone = "Phone number must be of 10 digits";


    setErrors(tempErrors);//inserting error messages
    return Object.keys(tempErrors).length === 0;//returning true if no error message or false if there is any error message
  };
  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      //if true
      const newData = { Id: uuidv4(), ...data }//create new data with id and form data
      const existingAccounts = JSON.parse(localStorage.getItem("accounts"));//fetching all the accounts data
      const updatedAccounts = Array.isArray(existingAccounts) ? [...existingAccounts, newData] : [newData];//checking if account is empty or not
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));//inserting data
      nav("/");//navigating to login page
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">

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


        <h3 className="text-start fw-semibold">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Your name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="First and last name"
              required
            />
            {errors.name && <p className=' text-danger text-center mx-4 my-2'>{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label fw-semibold">
              Mobile number
            </label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Mobile number"
              required
            />
            {errors.phone && <p className=' text-danger text-center mx-4 my-2'>{errors.phone}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {errors.email && <p className=' text-danger text-center mx-4 my-2'>{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={data.password}
              onChange={handleChange}

              placeholder="At least 6 characters"
              required
            />
            {errors.password && <p className=' text-danger text-center mx-4 my-2'>{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-warning w-100 rounded-pill">
            Create Account
          </button>
        </form>
        <div className="d-flex align-items-center mt-3" style={{ fontSize: "13px", marginLeft: "9%" }}>
          <h6 className="mb-0">Already have an account?</h6>
          <NavLink to="/" className="ms-2 fw-semibold text-decoration-none">Log in&gt;</NavLink>
        </div>


      </div>
    </div>
  );
}

export default Signup;