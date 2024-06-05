import { Box, Grid, Stack, Toolbar } from "@mui/material";
import {
  useGetTestQuery,
} from "../../app/services/api/endpoints/test";
import Canvas, { UrlImageProps } from "./Canvas";
import Layers from "./Layers";
import VerticalTabs from "./VerticalTabs";
import { useState } from "react";

const Home = () => {
  const [elements, setElements] = useState<Array<UrlImageProps>>([]);
  const { data } = useGetTestQuery();
  return (
    <Box height="calc(100vh - 64px)">
      <Toolbar />
      <Grid
      height="100%"
      alignItems="stretch"
      container
      spacing={0}
      columns={3}
      wrap="nowrap"
      justifyContent="space-between"
    >
      <Grid item>
        <VerticalTabs />
      </Grid>
      <Grid item sx={{ overflow: "auto" }} display="flex" alignItems="center">
        <Canvas elements={elements} />
      </Grid>
      <Grid item>
        <Layers />
      </Grid>
    </Grid>
    </Box>
  );
};

export default Home;
