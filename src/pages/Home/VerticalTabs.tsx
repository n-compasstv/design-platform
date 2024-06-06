import Box from "@mui/material/Box";
import { TbReload } from "react-icons/tb";
import { FaShapes } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import SolidTabs from "../../common/components/SolidTabs";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MediaDialog from "./components/MediaDialog";
import MediaList from "./components/MediaList";

const VerticalTabs = () => {
  const [mediaIsOpen, setMediaIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(-1);

  const tabs = [
    {
      label: "Media",
      icon: <FaPhotoFilm fontSize="large" />,
      content: <MediaList />,
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

  return (
    <Box
      height="100%"
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ boxShadow: 2 }}>
        <SolidTabs
          orientation="vertical"
          variant="fullWidth"
          value={0}
          onChange={() => {}}
          aria-label="Vertical side tabs"
        >
          {tabs.map((tab, index) => (
            <IconButton
              key={tab.label}
              sx={{
                py: 2,
                color: "#000",
                bgcolor: "#fff",
                borderRadius: "0px",
                borderTopRightRadius: index == 0 ? "5px" : "",
                borderBottomRightRadius: index == tabs.length - 1 ? "5px" : "",
                borderBottom:
                  index < tabs.length - 1 ? "1px solid #ededed" : "",
              }}
              onClick={() => {
                setSelectedTab(index);
                setMediaIsOpen(true);
              }}
            >
              <Box>
                <Box>{tab.icon}</Box>
                <Typography fontWeight={600}>
                  <small>{tab.label}</small>
                </Typography>
              </Box>
            </IconButton>
          ))}
        </SolidTabs>
      </Box>
      
      <MediaDialog
        content={selectedTab > -1 ? tabs[selectedTab].content : ""}
        open={mediaIsOpen}
        handleClose={() => {
          setSelectedTab(-1);
          setMediaIsOpen(false);
        }}
      />
    </Box>
  );
};

export default VerticalTabs;
