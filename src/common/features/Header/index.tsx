import { Box, Button, Stack, Typography } from "@mui/material";
import { FaHome, FaSave } from "react-icons/fa";
import { FaChartLine, FaPlus } from "react-icons/fa6";
import SaveTemplateDialog from "./SaveTemplateDialog";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks/useStore";

const Header = () => {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { template } = useAppSelector((s) => s.newsTemplate);
  return (
    <Stack direction="row" alignItems="center" flexGrow={1}>
      <Typography color="inherit">{template ? template.newsTitle : "News Builder"}</Typography>

      {template ? (
        <Box
          sx={{ justifyContent: "end", flexGrow: 1, display: { md: "flex" } }}
        >
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaChartLine size={14} />}
          >
            Dashboard
          </Button>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaHome size={14} />}
          >
            Home
          </Button>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaSave size={14} />}
            onClick={() => setIsSaveOpen(true)}
          >
            Save
          </Button>
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: 1 }}
            endIcon={<FaPlus size={14} />}
          >
            Save As
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <SaveTemplateDialog
        isOpen={isSaveOpen}
        handleClose={() => setIsSaveOpen(false)}
      />
    </Stack>
  );
};

export default Header;
