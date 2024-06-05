import { Box, Stack, Toolbar } from "@mui/material";
import { useLazyGetTestQuery } from "../../app/services/api/endpoints/test";
import VerticalTabs from "./components/VerticalTabs";
import DenseAppBar from "../../common/components/DenseAppBar";

const Home = () => {
  return (
    <Box>
      <Toolbar />
      <DenseAppBar />
      <VerticalTabs />
    </Box>
  );
};

export default Home;
