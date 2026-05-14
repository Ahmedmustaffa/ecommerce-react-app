import React from 'react';
import { Outlet } from "react-router-dom";
import { Nav } from '../components/Navbar.jsx'
export default function SharedLayout() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  );
}
