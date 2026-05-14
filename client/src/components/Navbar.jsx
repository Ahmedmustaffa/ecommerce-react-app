
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <Navbar >
      <NavbarBrand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <div className="flex md:order-2 gap-2">
        <Link to="/login" className="dark:text-white"> Login </Link>
        <Link to="/register" className="dark:text-white"> Register </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active>
          Home
        </NavbarLink>
        <NavbarLink>About</NavbarLink>
        <NavbarLink>Services</NavbarLink>
        <NavbarLink>Pricing</NavbarLink>
        <NavbarLink>Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
