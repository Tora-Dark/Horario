import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Logout from "../Logout";


export default function NaviMiddle() {
    return (
      <Navbar>
        {/* <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand> */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
       
    <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/Horario/auth">Login</Link>
        </NavbarItem>
        <NavbarItem>
        <Logout/>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/Horario/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      </Navbar>
    );
  }

