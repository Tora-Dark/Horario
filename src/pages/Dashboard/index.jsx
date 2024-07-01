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
    <div className="bg-slate-800   h-full  flex  shadow-inner shadow-current ">
      <Listbox
        className="w-52"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        autoFocus="boolean"
        color="default"
        aria-label="Navigation"
      >
        <ListboxItem
          textValue="home"
          key="home"
          className={` ${
            isActive("/Home")
              ? "bg-slate-700 text-slate-300  shadow-md "
              : "text-slate-300"
          }`}
          href="/api/home"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiAcademicCap />
            <div>
              <h2>Home</h2>
            </div>{" "}
          </div>
        </ListboxItem>
        <ListboxItem
          key="horario"
          textValue="horario"
          className={` ${
            isActive("/horario") ? "bg-slate-700 shadow-md  text-slate-300" : "text-slate-300"
          }`}
          href="/api/horario"
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
          className={` ${
            isActive("/asignaturas")
              ? "bg-slate-700 text-slate-300  shadow-md "
              : "text-slate-300"
          }`}
          href="/api/asignaturas"
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
          className={` ${
            isActive("/cursos")
              ? "bg-slate-700 text-slate-300  shadow-md "
              : "text-slate-300"
          }`}
          href="/api/cursos"
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
          className={` ${
            isActive("/locales")
              ? "bg-slate-700 text-slate-300  shadow-md "
              : "text-slate-300"
          }`}
          href="/api/locales"
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
          className={` ${
            isActive("/brigadas")
              ? "bg-slate-700 text-slate-300  shadow-md "
              : "text-slate-300"
          }`}
          href="/api/brigadas"
        >
          <div className="flex flex-raw text-large  content-center items-center gap-2">
            <HiUserGroup />
            <div>
              <h2>Brigadas</h2>
            </div>{" "}
          </div>
        </ListboxItem>
      </Listbox>
    </div>
  );
}
