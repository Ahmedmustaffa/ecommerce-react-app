import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SharedLayout from './SharedLayout.jsx';

export default function MainLayout() {
    return (
        <>
            <main className='dark:bg-gray-900 w-full min-h-screen flex flex-col'>
                <BrowserRouter>
                    
                    <Routes>
                        <Route path="/" element={<SharedLayout />}></Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}
