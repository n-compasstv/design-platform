import * as React from "react";

import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";

import { TbReload } from "react-icons/tb";
import { FaShapes } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import SolidTab from "../../../common/components/SolidTab";
import SolidTabs from "../../../common/components/SolidTabs";
import { useState } from "react";
import { KonvaImageType } from "../../../app/types/KonvaImageType";
import Canvas from "./Canvas";
import Konva from "konva";
import { IconButton, Typography } from "@mui/material";
import Layers from "./Layers";

const VerticalTabs = () => {
  const [value, setValue] = React.useState(0);

  const [elements, setElements] = useState<KonvaImageType | any>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{boxShadow: 2}}>
        <SolidTabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical side tabs"
        >
          {tabs.map((m, index) => (
            <IconButton
              sx={{
                color: "#000",
                bgcolor: "#fff",
                borderRadius: "0px",
                borderTopRightRadius: index == 0 ? "5px" : "",
                borderBottomRightRadius: index == tabs.length - 1 ? "5px" : "",
                borderBottom:
                  index < tabs.length - 1 ? "1px solid #ededed" : "",
              }}
            >
              <Box>
                <Box>{m.icon}</Box>
                <Typography fontWeight={500} component="small">{m.label}</Typography>
              </Box>
            </IconButton>
          ))}
        </SolidTabs>
      </Box>
      
      <TabPanel value={value} index={value}>
        <Layers />
        <Canvas elements={elements} />
      </TabPanel>
    </Box>
  );
};

export default VerticalTabs;

const tabs = [
  {
    label: "Media",
    icon: <FaPhotoFilm fontSize="large" />,
  },
  {
    label: "Shapes",
    icon: <FaShapes fontSize="large" />,
  },
  {
    label: "Dataset",
    icon: <FaTableList fontSize="large" />,
  },
  {
    label: "Text",
    icon: <IoText fontSize="large" />,
  },
  {
    label: "Reload",
    icon: <TbReload fontSize="large" />,
  },
];
