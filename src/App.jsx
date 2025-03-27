import Login from "./components/Account/Login"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { NavBar } from "./components/Navbar/NavBar"
import Home from "./components/Home/Home"
import Product from "./components/ProductDetails/ProductDetails"
import Cart from "./components/Cart/Cart"
import Checkout from "./components/Checkout/CheckoutPage"
import { ProductsPage } from "./components/ProductsPage/ProductsPage"
import Order from "./components/order/Order"
import AmazonFooter from "./components/Footer/Footer"
import Signup from "./components/Account/Signup"
import ErrorBoundary from "./Error Boundary/ErrorBoundary"
function App() {
  

  return (
    <>
  <Router>
    <NavBar/>
    <ErrorBoundary>
    <Routes>
    <Route exact path="/register" element={<Signup/>}/>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="/home" element={<Home/>}/>
    <Route exact path="/product/:id" element={<Product/>}/>
    <Route exact path="/cart" element={<Cart/>}/>
    <Route exact path="/checkout" element={<Checkout/>}/>
    <Route exact path="/products" element={<ProductsPage/>}/>
    <Route exact path="/orders" element={<Order/>}/>
  </Routes>
  </ErrorBoundary>
    <AmazonFooter/>
  </Router>
    </>
  )
}

export default App
