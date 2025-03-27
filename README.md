  # 🛒 E-Commerce React App  

  An e-commerce web application built with React.js that allows users to browse, search, and purchase products. The app fetches product data from the [FakeStore API](https://fakestoreapi.com/) and provides a seamless shopping experience.  

  ---

  ## 🚀 1. Installation and Setup Guide  

  ### Prerequisites  
  Ensure you have the following installed:  
  - **Node.js (v16+)**  
  - **npm or yarn**  

  ### Steps to Set Up Locally  
  ```sh
  # Clone the repository
  git clone https://github.com/yourusername/e-commerce-react.git

  # Navigate to project folder
  cd e-commerce-react

  # Install dependencies
  npm install  # or yarn install

  # Start the development server
  npm start  # or yarn start
  ```
  The app will be available at `http://localhost:3000/`  

  ---

  ## 📁 2.Code Structure  

  ```sh
    E-COMMERCE/
    │── public/                 # Static assets
    │── src/
    │   ├── components/         # Reusable UI components (Button, Navbar, etc.)
    │   │   ├── Account/        # Signup and Login Page
    │   │   ├── Cart/           # Shopping cart components
    │   │   ├── Checkout/       # Checkout components
    │   │   ├── Footer/         # Footer section
    │   │   ├── Home/           # Home page components
    │   │   ├── Navbar/         # Navigation bar
    │   │   ├── Order/          # Orders-related components
    │   │   ├── ProductDetails/ # Single product details Page
    │   │   ├── ProductsPage/   # Product listing page
    │   ├── context/            # Context API 
    │   │   ├── ThemeContext.js # Theme context for light/dark mode
    │   ├── redux/              # Redux store for user and cart data
    │   ├── ErrorBoundary/      # Handling Component-Level Errors
    │   ├── App.jsx             # Main app entry point
    │   ├── main.jsx            # React DOM entry point
    │   ├── index.css           # CSS For Theme Change
    │── .gitignore
    │── index.html              # HTML entry point
    │── package.json
    │── package-lock.json
    │── vite.config.js          # Vite configuration file
    │── README.md               # Project documentation


  ```

  ---

  ## ✍️ 3. Coding Standards  

  - **File Naming:** Intialcase for folders, PascalCase for files and components.  
  - **Component Naming:** Functional components start with an uppercase letter.  
  - **Styling:** Uses **Inline CSS, Bootstrap, and External Stylesheets**.  

  ```jsx
  // Example: Button Component (components/Button.js)
  import "../styles/Button.css";

  export default function Button({ label }) {
    return <button className="btn btn-primary" style={{ padding: "10px" }}>{label}</button>;
  }
  ```

  ---

  ## 🛋️ 4. State Management Guidelines  

  - **Redux** stores **user data and cart information**.  
  - **Product data** is fetched inside components using **Axios**.
  - **LocalStorage** is used to store **user data,cart data and orders data**.    
  - **Theme Context** manages **light/dark mode**.  

  ---

  ## 🔌 5. API Documentation  

  - **Base API URL:** `https://fakestoreapi.com/`  
  - **Endpoints Used:**  
    - `GET /products` - Fetch all products  
    - `GET /products/:id` - Fetch single product  
  ```js
  // Example API Call
  import axios from "axios";
  import React,{useState,useEffect} from "react";
  export const fetchProducts=()=> {
    const [data,setData]=useState("");
    useEffect(()=>{
        const fetchProducts=async ()=>{
            try{
            const response = await axios.get("https://fakestoreapi.com/products");
            setData(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        
    })
    
    return(
        <div>{data}</div>
    )
  };
  ```

  ---

  ## 🎨 6. UI/UX Guidelines  

  ### 🖼️ Design & Responsiveness  
  - **Bootstrap** for a responsive UI.  
  - **External CSS stylesheets and inline styling**.  

  ### 🌃 Themes  
  - Supports **Light/Dark mode** via React Context.  

  ### 🖼 Screenshots  
 
![Screenshot (109)](https://github.com/user-attachments/assets/084b6c51-2532-4411-892e-2c3ad8a3aa9d)
![Screenshot (111)](https://github.com/user-attachments/assets/79526636-9df4-42e6-9a29-c8a78ce8669e)

![Screenshot (112)](https://github.com/user-attachments/assets/38f38c2f-8928-4c68-8362-c1252a6ceb86) ![Screenshot (114)](https://github.com/user-attachments/assets/83cdc681-4420-4abf-bf17-30bfb1ed4e12)
![Screenshot (113)](https://github.com/user-attachments/assets/157f691c-6480-46a2-aec3-59980b259cd3)


  ---

  ## 🔥 7. Error Handling & Debugging  

  - **React Error Boundaries** for component-level issues.  
  - **API errors** handled with `try/catch`.   

  ```jsx
  //Example of error boundary
  import React, { Component } from "react";
  class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
    }
  }
  ```

  ---

 ## ✅ 8. Testing

this project primarily relies on **manual testing** through `console.log()`, here’s how we debug and test functionality:

### **Component Testing and Api Testing**

```jsx
    //Example
    import { useEffect, useState } from "react";
    import axios from "axios";

    function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // API call to fetch products
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            console.log("Fetched Products:", response.data); 
            setProducts(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);

    useEffect(() => {
        console.log("Component Updated: Product List Updated", products); // Log component update
    }, [products]);

    return (
        <div>
        <h2>Product List</h2>
        {products.length === 0 ? (
            <p>Loading...</p>
        ) : (
            products.map((product) => (
            <p key={product.id}>{product.title}</p>
            ))
        )}
        </div>
    );
    }

    export default ProductList;
  ```

  ---

  ## 🚀 9. Deployment  

  ### **Production Build**  
  ```sh
  npm run build
  ```
  - **Netlify** for hosting.  
  - **CI/CD pipeline** via GitHub Actions.  

  ---

  ## 🔄 10. Rollback Plan  

  - **Rollback Command on GitHub:**  
  ```sh
  git log --oneline #identify the last stable commit
  git revert <commit-hash> #revert to the last stable commit
  git push origin main #push the reverted commit to gitHub
  ```
  - **Rollback on Netlify:**
  
   1.Go to Netlify Dashboard->Your Site->Deploys.\
   2.Locate the previous successful deployment.\
   3.Click "Publish Deploy" to make it live again.
  
  ---

