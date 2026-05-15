import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Product from '../pages/Product.jsx';
import Favorite from '../pages/Favorite.jsx';
import Home from "../pages/Home.jsx";
import CartPage from "../components/CartPage.jsx"
import Shipping from "../components/Shipping.jsx"

export default function MainLayout() {
    return (
        <>
            <main className='dark:bg-gray-900 w-full min-h-screen flex flex-col'>
                <BrowserRouter>
                    
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/shipping" element={<Shipping />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}
