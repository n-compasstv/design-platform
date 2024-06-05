import { Box, Stack, Toolbar } from "@mui/material";
import {
  useGetTestQuery,
} from "../../app/services/api/endpoints/test";
import HomeContent from "./components/Content";

const Home = () => {
  const { data } = useGetTestQuery();
  return (
    <Box height="calc(100vh - 64px)">
      <Toolbar />
      <HomeContent />
    </Box>
  );
};

export default Home;
