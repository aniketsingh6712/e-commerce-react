import { NavLink } from "react-router-dom";

const AmazonFooter = () => {
  return (
    <footer className="text-white py-4" style={{backgroundColor:"#0f1728"}}>
      <div className="container text-center">
        <ul className="mb-3 d-flex flex-row justify-content-center">
          <li className="list-inline-item mx-2"><NavLink to="/home" className="text-white text-decoration-none">Home</NavLink></li>
          <li className="list-inline-item mx-2"><NavLink to="/products" className="text-white text-decoration-none">Products</NavLink></li>
          
          <li className="list-inline-item mx-2"><NavLink to="/orders" className="text-white text-decoration-none">Orders</NavLink></li>
        </ul>
        <div className="mb-3">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="fa fa-brands fa-twitter fa-2x"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="fa fa-brands fa-github fa-2x"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
            <i className="fa fa-brands fa-linkedin fa-2x"></i>
          </a>
       
        </div>
        <p className="small">&copy; 2025 Amazon Clone, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AmazonFooter;
