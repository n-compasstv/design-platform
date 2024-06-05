import Box from "@mui/material/Box";
import { TbReload } from "react-icons/tb";
import { FaShapes } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { IoText } from "react-icons/io5";
import SolidTabs from "../../common/components/SolidTabs";
import { IconButton, Typography } from "@mui/material";

const VerticalTabs = () => {
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
          {tabs.map((m, index) => (
            <IconButton
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
            >
              <Box>
                <Box>{m.icon}</Box>
                <Typography fontWeight={600}>
                  <small>{m.label}</small>
                </Typography>
              </Box>
            </IconButton>
          ))}
        </SolidTabs>
      </Box>
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
