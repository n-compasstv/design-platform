import styled from "@emotion/styled";
import { Tab } from "@mui/material";

interface StyledTabProps {
  label: string;
  icon: JSX.Element;
}

const SolidTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  color: "#fff",
  transition: "none",
  "&.Mui-selected": {
    color: "#fff",
    background: "rgba(142, 198, 65, 0.2)",
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
}));

export default SolidTab;
