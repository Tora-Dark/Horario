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

export function VerticalTabsNew({ asignaturas, setAsignaturaSeleccionada }) {
  const [visibleTabs, setVisibleTabs] = useState(0);

  const handleUp = () => {
    if (visibleTabs > 0) setVisibleTabs(visibleTabs - 1);
  };

  const handleDown = () => {
    if (visibleTabs < asignaturas.length - 4) setVisibleTabs(visibleTabs + 1);
  };
  return (
    <div className=" flex flex-col">
      <Tabs value={asignaturas[0]?.id} orientation="vertical">
        <TabsHeader className=" items-center content-center">
          <div>
            <IconButton onClick={handleUp}>
              <HiChevronDoubleUp />
            </IconButton>
          </div>
          <div className=" w-32 bg-sky-300 rounded shadow-sm items-center content-center text-slate-700 shadow-slate-700 ">
            {asignaturas
              .slice(visibleTabs, visibleTabs + 4)
              .map((asignatura) => (
                <Tab
                  key={asignatura?.id}
                  value={asignatura?.id}
                  onClick={() => {
                    setAsignaturaSeleccionada(asignatura);
                  }}
                  className="h-12 w-28 m-2 "
                >
                  {asignatura?.nombre}
                </Tab>
              ))}
          </div>
          <div>
            <IconButton onClick={handleDown}>
              <HiChevronDoubleDown />
            </IconButton>
          </div>
        </TabsHeader>
        <div className="flex bg-slate-100 m-3 rounded h-48 w-36 shadow-sm shadow-slate-500 items-center content-center text-center">
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
        </div>
      </Tabs>
    </div>
  );
}
