import styled from "@emotion/styled";
import { Tab, Tabs, TabsProps } from "@mui/material";

interface StyledTabsProps {
  children: JSX.Element[] | string | undefined;
}

const SolidTabs = styled((props: StyledTabsProps&TabsProps) => (
  <Tabs {...props}>{props.children}</Tabs>
))(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

export default SolidTabs;
