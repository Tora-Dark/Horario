import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Listbox,
  ListboxItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@nextui-org/react";

import {
  HiReceiptTax,
  HiCalendar,
  HiBookmark,
  HiAcademicCap,
  HiLibrary,
  HiUserGroup,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TopNavbar() {
  const location = useLocation();

  const isActive = (href) => location.pathname === href;
  return (
    <>
      <Listbox
        variant="faded"
        disallowEmptySelection
        selectionMode="single"
        autoFocus="boolean"
        color="danger"
        aria-label="Navigation"
      >
        <ListboxItem
          key="horario"
          textValue="horario"
          className={`text-white ${isActive("/horario") ? "bg-slate-700 text-slate-300" : ""}`}
      
          href="/horario"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiCalendar />
            <div>
              <h2>Horario</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          key="asignaturas"
          textValue="asignaturas"
          className={`text-white ${isActive("/asignaturas") ? "bg-slate-700 text-slate-300" : ""}`}
          href="/asignaturas"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiBookmark />
            <div>
              <h2>Asignaturas</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          textValue="cursos"
          key="cursos"
          className={`text-white ${isActive("/horario") ? "bg-slate-700 text-slate-300" : ""}`}
          href="/cursos"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiAcademicCap />
            <div>
              <h2>Cursos</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          textValue="locales"
          key="locales"
          className={`text-white ${isActive("/horario") ? "bg-slate-700 text-slate-300" : ""}`}
          href="/locales"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiLibrary />
            <div>
              <h2>Locales</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          textValue="brigadas"
          key="brigadas"
          className="text-white text-large"
          href="/brigadas"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiUserGroup />
            <div>
              <h2>Brigadas</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          textValue="otros"
          key="otros"
          className="text-white text-large"
          href="/"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiAcademicCap />
            <div>
              <h2>Otros</h2>
            </div>{" "}
          </div>
        </ListboxItem>
      </Listbox>
    </>
  );
}
