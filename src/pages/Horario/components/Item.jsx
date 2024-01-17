import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Item = ({ clase, color, turn, fecha }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/createClase?turn=${turn+1}&fecha=${fecha+1}`);
  };
  return clase ? (
    <div className={`${color} ` + "text-black w-full h-full"}>
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col w-full h-full border-r border-black">
          <div className="flex justify-evenly">
            <h2>{clase?.asignatura?.nombre}</h2>
            <h2>{clase?.tipo}</h2>
          </div>
          <h2 className="text-center">{clase?.local?.nombre}</h2>
        </div>
        <div className="col-span-1 flex flex-col font-bold text-center">
          <p>+</p>
          <p>-</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-black flex items-center place-content-center">
      <IconButton aria-label="" onClick={handleButtonClick}>
        <HiOutlinePlusCircle className="" />
      </IconButton>
    </div>
  );
};

export default Item;
