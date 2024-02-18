import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import { HiChevronDoubleDown } from "react-icons/hi";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

export function VerticalTabsNew( {asignaturas,  setAsignaturaSeleccionada} ) {
  const [visibleTabs, setVisibleTabs] = useState(0);

  const handleUp = () => {
    if (visibleTabs > 0) setVisibleTabs(visibleTabs - 1);
  };

  const handleDown = () => {
    if (visibleTabs < asignaturas.length - 4) setVisibleTabs(visibleTabs + 1);
  };
  return (
    <Tabs value={asignaturas[0]?.id}  orientation="vertical">
      <TabsHeader className="w-32 ">
        <IconButton onClick={handleUp}>
          <HiChevronDoubleUp />
        </IconButton>
        {asignaturas.slice(visibleTabs, visibleTabs + 4).map((asignatura) => (
          <Tab
            key={asignatura?.id}
            value={asignatura?.id}
            onClick={() => {
              setAsignaturaSeleccionada(asignatura);
            }}
            className="h-12"
          >
            {asignatura?.nombre}
          </Tab>
        ))}
        <IconButton onClick={handleDown}>
          <HiChevronDoubleDown />
        </IconButton>
      </TabsHeader>
      <TabsBody>
        {asignaturas.map((asignatura) => (
          <TabPanel
            key={asignatura?.id}
            value={asignatura?.id}
            className="py-0 "
          >
            {asignatura?.nombre}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
