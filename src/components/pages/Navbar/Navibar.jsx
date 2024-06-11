import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
/* import {AcmeLogo} from "./AcmeLogo.jsx"; */

export default function App() {
  return (
    <div >

    <Navbar  isBlurred={false}
     className="bg-inherit"
            >
   {/*    <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand> */}
      <NavbarContent className="hidden sm:flex  gap-4" justify="center">
        <NavbarItem>
          <Link href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link  href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/Horario/auth">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/Horario/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
        </div>
  );
}
