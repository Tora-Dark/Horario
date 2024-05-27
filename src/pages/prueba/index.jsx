import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

export default function Prueba() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];
  const handleAction = (key) => {
    console.log("Hiciste clic en: ", key);
  };

  const DropdownContent = ({ variant, color }) => (
    <Dropdown>
      <DropdownTrigger>
        <Button color={color} variant={variant} className="capitalize">
          {variant}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color={color}
        variant={variant}
        onAction={handleAction}
      >
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <>
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <DropdownContent
          key={variant}
          color={selectedColor}
          variant={variant}
        />
      ))}
      <RadioGroup
        label="Select dropdown color"
        orientation="horizontal"
        color={selectedColor}
        defaultValue="default"
        onValueChange={setSelectedColor}
      >
        <Radio value="default">Default</Radio>
        <Radio value="primary">Primary</Radio>
        <Radio value="secondary">Secondary</Radio>
        <Radio value="success">Success</Radio>
        <Radio value="warning">Warning</Radio>
        <Radio value="danger">Danger</Radio>
      </RadioGroup>
    </div>
    <MiComponente/>
    </>
  );
}
export  function MiComponente() {
    const handleClick = (e) => {
      e.preventDefault();
      console.log("Hiciste clic en un elemento del dropdown!");
    };
  
    return (
        <>
        <h1>holas</h1>
      <Dropdown title="Menú">
        <DropdownItem onClick={handleClick}>
          Opción 1
        </DropdownItem>
        <DropdownItem onClick={handleClick}>
          Opción 2
        </DropdownItem>
      </Dropdown>
      </>
    );
  }