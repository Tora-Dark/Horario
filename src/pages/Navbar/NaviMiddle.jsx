import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { HiHome } from "react-icons/hi";
import { GrGroup } from "react-icons/gr";
import { FaArrowUp,  } from "react-icons/fa";
import { useLocation } from "react-router-dom";


export default function NaviMiddle() {
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <Navbar className="bg-slate-800">
      <NavbarContent justify="center">
        <NavbarItem>
          <Button
            as={Link}
            color="foreground"
            className={` ${
              isActive("/home")
                ? "bg-slate-700 text-slate-300 shadow-md"
                : "text-slate-300"
            }`}
            href="/api/home"
            size="lg"
          >
            <HiHome />
            Inicio
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="foreground"
            className={` ${
              isActive("/aboutUs")
                ? "bg-slate-700 text-slate-300 shadow-md"
                : "text-slate-300"
            }`}
            href="/api/aboutUs"
            size="lg"
          >
            <GrGroup />
            Sobre nosotros
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="foreground"
            className={` ${
              isActive("/integrations")
                ? "bg-slate-700 text-slate-300 shadow-md"
                : "text-slate-300"
            }`}
            href="/api/integrations"
            size="lg"
          >
            Integrations
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            variant="shadow"
            color="secondary"
            as={Link}
            size="lg"
            href="/api/horario"
          >
            <FaArrowUp />
            Get Started
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            size="lg"
            color="primary"
            variant="ghost"
            className="text-white"
            href="/api/auth"
          >
            Iniciar sesión
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            size="lg"
            className="text-white"
            href="/api/register"
          >
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
