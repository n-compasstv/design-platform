import { Box, Stack, Toolbar } from "@mui/material";
import {
  useGetTestQuery,
  useLazyGetTestQuery,
} from "../../app/services/api/endpoints/test";
import VerticalTabs from "./components/VerticalTabs";
import DenseAppBar from "../../common/components/DenseAppBar";
import HomeContent from "./components/Content";

const Home = () => {
  const { data } = useGetTestQuery();
  return (
    <Box>
      <DenseAppBar />
      <Toolbar />
      <HomeContent />
    </Box>
  );
};

export default Home;
