import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ThemeProvider } from './context/Theme/ThemeContext';
import "./index.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
  </StrictMode>,
)
